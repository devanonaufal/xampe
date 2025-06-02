import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Button, Icon, Layout, Spinner, Text, useStyleSheet, useTheme } from "@ui-kitten/components";

import { pesertaLogout } from '../../api/login';
import { AuthenticationStackParamList } from "../../navigation/navigation-types";

interface loadingProps {
    title: string;
    subtitle?: String;
    showQuit?: boolean;
    style?: StyleProp<ViewStyle>;
    network: number;
    showRefresh?: boolean;
    onClickRefresh?(): void;
}

const ActionBar = ({ title = 'SMPN 13 MALANG', subtitle, showQuit = true, style, network, showRefresh = false, onClickRefresh }: loadingProps) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { navigate } = useNavigation<NavigationProp<AuthenticationStackParamList>>();

    let colorNetwork =
        network > 90 ? theme['color-success-100'] :
            network > 0 ? theme['color-primary-100'] :
                theme['color-danger-100'];

    const [loadingState, setLoadingState] = React.useState(false);

    const handleLogout = async () => {
        setLoadingState(true)
        try {
            const response = await pesertaLogout();
            if (response && response.message) {
                navigate('LoginScreen' as any)
                setLoadingState(false)
            } else {
                navigate('LoginScreen' as any)
                setLoadingState(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [refreshDisabled, setRefreshDisabled] = React.useState(false);
    const handleRefresh = async () => {
        if (!refreshDisabled) {
            // Disable the refresh button
            setRefreshDisabled(true);

            // Call your refresh logic here
            await onClickRefresh();

            // Set a cooldown period of 5 seconds
            setTimeout(() => {
                // Enable the refresh button after the cooldown
                setRefreshDisabled(false);
            }, 10000);
        } else {
            // Display an alert if the button is on cooldown
            Alert.alert('Refresh Lagi Dalam 10 detik!', 'Please wait...');
        }
    };

    const refreshing = () => {
        return loadingState ? (<Spinner size={"small"} />) : (<Icon pack="assets" name="reload" style={{ height: 15, width: 15 }} />)
    }

    const loggingout = () => {
        return loadingState ? (<Spinner size={"tiny"} />) : (<Icon pack="assets" name="power" style={{ height: 15, width: 15 }} />)
    }

    return (
        <Layout
            style={[styles.navigation, style, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Layout style={{ backgroundColor: 'transparent' }}>
                <Text style={styles.title}>{title}</Text>
                {subtitle ? (<Text style={styles.subtitle}>{subtitle}</Text>) : null}
            </Layout>
            <Layout style={{ alignItems: "center", flexDirection: 'row', backgroundColor: 'transparent' }}>
                <Layout style={[styles.networkStatus, { backgroundColor: colorNetwork }]} />
                {showQuit ? (
                    <Button size={'small'} style={[styles.logoff]} accessoryLeft={loggingout} onPress={handleLogout} />
                ) : (showRefresh ? (
                    <Button size={'small'} style={[styles.refresh]} accessoryLeft={refreshing} onPress={handleRefresh} />
                ) : null
                )
                }
            </Layout>
        </Layout>
    );
}

export default ActionBar;

const themedStyles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        lineHeight: 24,
        fontSize: 22,
        paddingVertical: 5,
    },
    subtitle: {
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 12.5,
        paddingTop: 2.5,
        color: 'color-basic-830'
    },
    navigation: {
        backgroundColor: '#F1F1FA',
        borderColor: "#1F1F1F33",
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        borderWidth: 1,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    networkStatus: {
        borderRadius: 8,
        width: 16,
        height: 16,
    },
    logoff: {
        marginStart: 15,
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'color-danger-100',
    },
    refresh: {
        marginStart: 15,
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'color-primary-100'
    },
});