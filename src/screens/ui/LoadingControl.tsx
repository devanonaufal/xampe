import { Text, VStack } from "../../components";
import { Button, Icon, Spinner, StyleService, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";

interface loadingProps {
    text: string;
    isLoading?: boolean;
    onClickRefresh?(): void;
    lightText?: boolean;
    type?: '1' | '2' | string;
}
const LoadingControl = ({ text, isLoading = false, onClickRefresh, lightText = false, type = '2' }: loadingProps) => {
    const styles = useStyleSheet(themedStyles);

    const reloading = () => {
        return isLoading ? (
            <Spinner size={"small"} />
        ) :
            (<Icon pack="assets" name="reload" style={styles.icon} />)
    }

    const getMarginTop = () => {
        return type === '1' ? '40%' : 0;
    }

    return (
        <VStack alignSelfCenter={true} style={{ marginTop: getMarginTop(), alignItems: 'center' }}>
            <Text marginBottom={8} style={lightText ? styles.text : undefined}>{text}</Text>
            <Button size={"small"} accessoryLeft={reloading} onPress={onClickRefresh} />
        </VStack>
    );
}

export default LoadingControl;

const themedStyles = StyleService.create({
    text: {
        color: 'color-basic-1100'
    },
    icon: {
        width: 20, height: 20
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: '40%'
    }
})