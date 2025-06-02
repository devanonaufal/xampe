import {VStack} from "components";
import {LoadingControl} from "../../ui";
import * as React from "react";
import {StyleService, useStyleSheet} from "@ui-kitten/components";

interface Props {
    type: 'head'|'body';
    isLoading?: boolean;
    onClickRefresh?(): void;
}
const CardEmpty = ({type = 'body', isLoading = false, onClickRefresh}: Props) => {
    const styles = useStyleSheet(themedStyles);

    return type === 'head' ?
        (<VStack level={'6'} style={[styles.base, styles.head]} pv={32}>
            <LoadingControl
                text={"Tidak ada jadwal ujian"}
                onClickRefresh={onClickRefresh}
                isLoading={isLoading}
                lightText={true}/>
        </VStack>)
        :
        (<VStack level={'3'} style={[styles.base, styles.body]} pv={32}>
            <LoadingControl
                text={"Tidak ada jadwal ujian"}
                onClickRefresh={onClickRefresh}
                isLoading={isLoading}/>
        </VStack>)
}

export default CardEmpty

const themedStyles = StyleService.create({
    base: {
        alignItems: 'center', borderRadius: 16,
    },
    body: {
        backgroundColor: "color-basic-810",
    },
    head: {
        backgroundColor: "color-primary-100",
    }
})