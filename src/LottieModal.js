import React, { Component } from 'react'
import { View, Text, Modal, StatusBar } from 'react-native'
import PropTypes from 'prop-types';
import { styles, width } from './Constants';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;

export default class LottieModal extends Component {
    static propTypes = {
        startFrame: PropTypes.number,
        endFrame: PropTypes.number,
        percentSize: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        animation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        loop: PropTypes.bool,
        visibleTime: PropTypes.number,
        hideStatusBar: PropTypes.bool,
        onShow: PropTypes.func,
        onModalClose: PropTypes.func,
        onRequestClose: PropTypes.func,
        onDismiss: PropTypes.func,
        onOrientationChange: PropTypes.func,
        hardwareAccelerated: PropTypes.bool,
        animationType: PropTypes.string,
        transparent: PropTypes.bool,
    };
    
	static defaultProps = {
        startFrame: undefined,
        endFrame: undefined,
        percentSize: 0.6,
        title: undefined,
        body: undefined,
        animation: undefined,
        loop: false,
        visibleTime: 3000,
        hideStatusBar: true,
        onShow: null,
        onModalClose: null,
        onRequestClose: null,
        onDismiss: null,
        onOrientationChange: null,
        hardwareAccelerated: false,
        animationType: "slide",
        transparent: false,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        if (this.props.hideStatusBar) {
            StatusBar.setHidden(visible, "none");
        }
        this.setState({modalVisible: visible}, () => {
            if (visible == true) {
                if (this.props.startFrame && this.props.endFrame) {
                    this.modalAnimation.play(this.props.startFrame, this.props.endFrame);
                } else {
                    this.modalAnimation.play();
                }
                setTimeout(() => {
                    this.setModalVisible(false);
                    this.props.onModalClose();
                }, this.props.visibleTime || 3000);
            }
        });
    }
    
    render() {
        return (
            <Modal
            animationType={this.props.animationType}
            transparent={this.props.transparent}
            visible={this.state.modalVisible}
            onShow={() => this.props.onShow()}
            onRequestClose={() => this.props.onRequestClose()}
            onDismiss={() => this.props.onDismiss()}
            onOrientationChange={() => this.props.onOrientationChange()}
            hardwareAccelerated={this.props.hardwareAccelerated}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={{width: width * this.props.percentSize, height: width * this.props.percentSize}}>
                        <Lottie
                            style={{
                                width: width * this.props.percentSize,
                                height: width * this.props.percentSize,
                            }}
                            ref={animation => {
                                this.modalAnimation = animation;
                            }}
                            source={this.props.animation}
                            loop={this.props.loop}
                        />
                    </View>
                    <Text style={styles.body}>{this.props.body}</Text>
                </View>
            </Modal>
        )
    }
}