//React
import React, { useState }from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { captureScreen } from 'react-native-view-shot'

//SRCs
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { ArrowLeft } from 'phosphor-react-native';
import { theme } from '../../theme';
import { styles } from './styles';

//API
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system'
///////////////////////////////////////////////////////////////////////////////////////


interface Props{
    feedbackType: FeedbackType
    onFeedbackCanceled: ()=> void;
    onFeedbackSent: ()=> void; 
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
    //States
    const [screenshot, setScreenshot]= useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback]= useState(false);
    const [comment, setComment]= useState('');
    
    const feedbackTypeInfo= feedbackTypes[feedbackType];

    //functions
    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.1
        })
        .then(uri => setScreenshot(uri))
        .catch(error=> console.log(error));
    }
    function handleScreenshotRemove(){
        setScreenshot(null);
    }
    async function handleSendFeedback() {
        if(isSendingFeedback){
            return
        }

        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

        try {
            await api.post('/feedbacks', {
                type: feedbackType, 
                screenshot: `data:image/png;base64,${screenshotBase64}`,
                comment,
            })

            onFeedbackSent();
            
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }


//return
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                    size={24}
                    weight= 'bold'
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                
                <Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                />

                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot= {screenshot}
            />

            <Button
            onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>
    </View>

  );
}