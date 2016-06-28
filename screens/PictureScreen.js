/**
 * Created by Benedikt on 21.05.2016.
 */

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Image,
    Alert
} from "react-native";
import ViewContainer from "../components/frontend/ViewContainer";
import ButtonContainer from "../components/frontend/ButtonContainer";
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

var instance = null;

class PictureScreen extends Component {

    constructor(props) {
        super(props);

        instance = this;
    }

    state = {
        pictureSource: ''
    };

    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'Logout', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Bilder hochladen
                    </Text>

                    <Image style={styles.thumbnail}
                           source={this.state.pictureSource}
                    />
                </View>

                <ButtonContainer>
                    <TouchableHighlight
                        onPress={()=>this._selectPicture(this)}>
                        <Text style={styles.btnText}>
                            Bild auswählen
                        </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight
                        onPress={()=>this._upload(this)}>
                        <Text style={styles.btnText}>
                            Bild hochladen
                        </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>

        );
    }

    _selectPicture(self) {
        var options = {
            title: 'Bild auswählen', // specify null or empty string to remove the title
            cancelButtonTitle: 'Abbrechen',
            takePhotoButtonTitle: 'Foto machen...', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: 'Aus Bibliothek auswählen...', // specify null or empty string to remove this button
            cameraType: 'back', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            videoQuality: 'high', // 'low', 'medium', or 'high'
            durationLimit: 10, // video recording max time in seconds
            maxWidth: 1024, // photos only
            maxHeight: 1024, // photos only
            aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
            aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
            quality: 0.6, // 0 to 1, photos only
            angle: 0, // android only, photos only
            allowsEditing: false, // Built in functionality to resize/reposition the image after selection
            noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
            storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
                skipBackup: true, // ios only - image will NOT be backed up to icloud
                path: 'images' // ios only - will save image at /Documents/images rather than the root
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // uri (on android)
                //const source = {uri: response.uri, isStatic: true};

                this.setState({
                    pictureSource: source
                });
            }
        });

    }

    _upload(self) {
        if (this.state.pictureSource == '') {
            Alert.alert('Fehler', "Es wurde noch kein Bild ausgewählt.", [{text: 'ok'}]);
        } else {
            Alert.alert('Button', "Es wurde hochladen geklickt.", [{text: 'ok'}]);
            // Hier fehlt noch was
        }
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateBackToMessageScreen() {
        this.props.navigator.pop({
            ident: "Message"
        })
    }

    _navigateToLogInScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateBackToMessageScreen();
                break;
            case 1:
                instance._navigateToMainMenue();
                break;
            case 2:
                instance._navigateToLogInScreen();
                break;
        }
    }
}

const styles = StyleSheet.create({

    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    thumbnail: {
        resizeMode: 'contain',
        marginBottom: 25,
        width: 300,
        height: 350
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    toolbarView: {
        height: 50,
        marginRight: 200
    }
});

module.exports = PictureScreen;
