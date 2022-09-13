import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View, Pressable, Text, TouchableHighlight
} from 'react-native';

const Checkbox = (props) => {
    const [selectColor, setSelectColor] = useState("#fff")
    useEffect(() => {
        let array = props.friendsArr
        if(array.indexOf(props.friendId) !== -1){
            setSelectColor("#00ff04")
        } else {
            setSelectColor("#fff")
        }
    }, [props.friendsArrLen])
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} style={styles.CheckboxContainer}>
                <View style={{backgroundColor: `${selectColor}`, height: 8, width: 8}}></View>
            </TouchableHighlight>
        <Text>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        CheckboxContainer: {
            display: 'inlineFlex',
            border: '3px solid green',
            height: '15px',
            width: '15px',
            padding: 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });

/*Checkbox.propTypes = {
    keyValue: PropTypes.number.isRequired,
    }/*size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    labelColor: PropTypes.string,
    checkedObjArr: PropTypes.object.isRequired
}
Checkbox.defaultProps = {
    size: 32,
    checked: false,
    value: 'Default',
    label: 'Default',
    color: '#cecece',
    labelColor: '000000',
}*/

export default Checkbox




