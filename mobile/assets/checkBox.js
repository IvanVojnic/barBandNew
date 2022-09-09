import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View, Pressable, Text, TouchableHighlight
} from 'react-native';

const Checkbox = (props) => {
   /* const [selectColor, setSelectColor] = useState("#fff")
    useEffect(() => {
        if(props.isChecked){
            setSelectColor("#00ff04")
        } else {
            setSelectColor("#fff")
        }
    }, [props.isChecked])*/
    const selectColor = props.isChecked ? "#fff" : "#00ff04";

    return (
            <TouchableHighlight onPress={props.onPress} style={styles.CheckboxContainer}>
                <View style={{backgroundColor: `${selectColor}`}}></View>
            </TouchableHighlight>
    );
}

const styles = StyleSheet.create(
    {
        CheckboxContainer: {
            display: 'inlineFlex',
            border: '3px solid green',
            height: '10px',
            width: '10px',
            padding: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        SelectSymbol: {
           backgroundColor: '#00ff04'
        }
    });

/*
Checkbox.propTypes = {
    keyValue: PropTypes.number.isRequired,
    size: PropTypes.number,
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
