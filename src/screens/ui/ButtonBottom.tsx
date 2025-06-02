import {Button, Spinner} from "@ui-kitten/components";
import {Text, VStack} from "components";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";

interface ButtonBottomProps {
    showBack?: boolean;
    onPress?(): void;
    isLoading: boolean;
    text?: string;
}
const ButtonBottom = ({isLoading, showBack = false, onPress, text = 'Mulai'}: ButtonBottomProps) => {
    const {goBack} = useNavigation();

    return (<VStack style={{position: "absolute", bottom: 0, right: 0, left: 0, padding: 30}}>
        <Button disabled={isLoading} status={"primary"} accessoryLeft={isLoading ? <Spinner/> : undefined}
                onPress={onPress}>
            {props => <Text {...props}>{text}</Text>}
        </Button>
        {showBack ? (
        <Button status={"danger"} style={{marginTop: 16}} onPress={goBack} appearance={"outline"}>
            Kembali
        </Button>) : null}
    </VStack>)
}
export default ButtonBottom;