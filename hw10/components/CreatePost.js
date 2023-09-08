import { Input, Stack, FormControl, Button, Modal, TextArea } from 'native-base';
import { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { set } from 'react-native-reanimated';
export default function CreatePostModal(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return <Modal isOpen={props.isOpen} size="full" onClose={() => props.closeModal()}>
        <Modal.Content maxH="800">
            <Modal.CloseButton />
            <Modal.Header>Create A Post</Modal.Header>
            <Modal.Body>
                <FormControl>
                    <FormControl.Label>Title</FormControl.Label>
                    <Input value={title} onChangeText={text => setTitle(text)} />
                </FormControl>
                <FormControl mt="3">
                    <FormControl.Label>Body</FormControl.Label>
                    <Input onChangeText={text => setContent(text)} value={content} />
                </FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                        props.closeModal();
                    }}>
                        Cancel
                    </Button>
                    <Button onPress={() => {
                        // console.log(textarea.current);
                        props.addPost(title, content);
                        setTitle("");
                        setContent("");
                    }}>
                        Post
                    </Button>
                </Button.Group>
            </Modal.Footer>
        </Modal.Content>
    </Modal>
}