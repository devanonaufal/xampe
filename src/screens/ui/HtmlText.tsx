import RenderHTML, {HTMLContentModel, HTMLElementModel} from "react-native-render-html";
import {StyleProp, ViewStyle} from "react-native";
import {Layout} from "@ui-kitten/components";
import {useLayout} from "hooks";


interface htmlTextInterface {
    text: string,
    style?: StyleProp<ViewStyle>;
}
const HtmlText = ({text, style}: htmlTextInterface) => {
    const {height, width, top, bottom} = useLayout();

    const customHTMLElementModels = {
        'font': HTMLElementModel.fromCustomModel({
            tagName: 'font',
            contentModel: HTMLContentModel.block
        })
    };

    return (<Layout style={style}>
        <RenderHTML source={{html:text}} contentWidth={width} customHTMLElementModels={customHTMLElementModels}/>
    </Layout>)
}
export default HtmlText;