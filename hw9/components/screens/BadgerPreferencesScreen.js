import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import BadgerPreferenceSwitch from '../BadgerPreferenceSwitch';
import uuid from 'react-native-uuid';
import { ScrollView } from 'react-native-gesture-handler';
import {  addTag, removeTag } from '../../redux/tagsSlice';

function BadgerPreferencesScreen(props) {
    const [alltags, setallTags] = useState([]);
    const articles = useSelector(state => state.articles.value)
    const tags = useSelector(state => state.tags.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (articles.length === 0)
            return;
        const tempTags = articles.reduce((acc, cur) => {
            cur.tags.forEach(tag => {
                if (!acc.includes(tag))
                    acc.push(tag);
            })
            return acc;
        }, []);
        setallTags(tempTags);
        tempTags.forEach(tag => {
            if (!tags.includes(tag))
                dispatch(addTag(tag));
        });
    }, [articles])

    const handleToggle = (name, ison) => {
        if(ison)
            dispatch(addTag(name));
        else
            dispatch(removeTag(name));
    }

    return <ScrollView style={{ marginTop: 49, width: '100%' }}>
        {alltags.map(tag => {
            return <BadgerPreferenceSwitch style={{}} initVal={tags.includes(tag)} key={uuid.v4()} prefName={tag} handleToggle={handleToggle} />
        })}</ScrollView>
}

export default BadgerPreferencesScreen;