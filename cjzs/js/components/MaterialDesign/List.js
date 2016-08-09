import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { TYPO } from './config';
import Ripple from './Ripple';
export default class List extends Component {

    static propTypes = {
        primaryText: PropTypes.string.isRequired,
        secondaryText: PropTypes.string,
        captionText: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        secondaryTextMoreLine: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            style: PropTypes.object
        })),
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element,
        leftAvatar: PropTypes.element,
        rightAvatar: PropTypes.element,
        lines: PropTypes.number,
        primaryColor: PropTypes.string,
        onPress: PropTypes.func,
        onLeftIconClick: PropTypes.func,
        onRightIconClick: PropTypes.func
    };

    static defaultProps = {
        lines: 1,
        primaryColor: 'rgba(0,0,0,.87)'
    };

    render() {
        const {
            primaryText,
            secondaryText,
            leftIcon,
            leftAvatar,
            rightAvatar,
            rightIcon,
            lines,
            onPress,
            primaryColor,
            onLeftIconClicked,
            onRightIconClicked,
            secondaryTextMoreLine,
            captionText,
            captionIcon,
            style,
            splitLine
        } = this.props;
        return (
            <Ripple onPress={onPress}>
                <View style={[styles.listContainer, {borderBottomWidth:splitLine?splitLine:0,height: lines > 2 ? ((lines -1) * 16 + 56) : (secondaryText ? 72 : (leftAvatar || rightAvatar ) ? 56 : 48) },style]}>
                    {leftIcon &&
                        <TouchableWithoutFeedback onPress={onLeftIconClicked}>
                            <View style={[styles.leftIcon, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start'}]}>
                                {leftIcon}
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {leftAvatar &&
                        <View style={[styles.leftAvatar, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
                            {leftAvatar}
                        </View>
                    }
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <View style={styles.firstLine}>
                            <View style={styles.primaryTextContainer}>
                                <Text numberOfLines={1} style={[styles.primaryText,{ color: primaryColor }]}>
                                    {primaryText}
                                </Text>
                            </View>
                            {(lines > 2 && !!rightIcon) ||
                                <View style={styles.captionTextContainer}>
                                    <Text style={styles.captionText}>
                                        {captionText}
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={styles.firstLine}>
                        {secondaryText &&
                            <View style={styles.secondaryTextContainer}>
                                <Text numberOfLines={1} style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) -4 }, styles.secondaryText]}>
                                    {secondaryText}
                                </Text>
                            </View>
                        }
                        {captionIcon}
                        {secondaryTextMoreLine &&
                            <View style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) - 4 }]}>
                                {secondaryTextMoreLine.map((line) => (
                                    <Text style={[styles.secondaryText, { height: 22 }, line.style]}>
                                        {line.text}
                                    </Text>
                                ))}
                            </View>
                        }
                        </View>
                    </View>

                    {rightAvatar &&
                        <View
                            style={[styles.rightAvatar, lines > 2 && {
                                paddingTop: 16,
                                alignSelf: 'flex-start'
                            }]}
                        >
                            {rightAvatar}
                        </View>
                    }
                    <View style={{ flexDirection: 'column' }}>
                        {lines > 2 && !!rightIcon && !!captionText &&
                            <View style={styles.captionTextContainer2}>
                                <Text style={styles.captionText}>{captionText}</Text>
                            </View>}

                        {rightIcon &&
                            <Ripple onPress={onRightIconClicked}>
                                <View
                                    style={[styles.rightIcon, { flex: 1 },lines > 2 && {
                                        paddingTop: 16,
                                        alignSelf: 'flex-end',
                                        justifyContent:'flex-end'
                                    }]}
                                >
                                    {rightIcon}
                                </View>
                            </Ripple>
                        }
                    </View>
                </View>
            </Ripple>
        )
    }
}
const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        minHeight: 48,
        alignItems: 'center',
        borderColor:'#eee',
        borderStyle:'solid'
    },
    leftIcon: {
        marginRight:16,
        position: 'relative'
    },
    rightIcon: {
        paddingLeft: 16,
        position: 'relative',
        left: -8
    },
    leftAvatar: {
        width: 56
    },
    rightAvatar: {
        width: 56
    },
    primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
    secondaryText: Object.assign({}, TYPO.paperFontBody1, {
        lineHeight: 22,
        fontSize: 14,
        color: 'rgba(0,0,0,.54)'
    }),
    firstLine: {
        flexDirection: 'row'
    },
    secondaryTextContainer: {
        flex: 1,
        paddingRight: 16,
        justifyContent:'flex-start'
    },
    primaryTextContainer: {
        flex: 1,
        paddingRight: 16
    },
    captionTextContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    captionText: Object.assign({color:'#8d8d8d'}, TYPO.paperFontCaption),
    captionTextContainer2: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});