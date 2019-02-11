// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import React from 'react';

import { View, Text, Switch } from 'react-native';

import Config from './Config';

import { Styles } from './Styles';
import { BottomButton } from './SharedComponents';
import { navigateWithDisabledBack } from './Utilities';

export class DisclaimerScreen extends React.Component {
    static navigationOptions = {
        title: 'Disclaimer',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            feeAccepted: Config.feePercentage > 0 ? false : true,
            keyOwnershipAccepted: false,
            warrantyAccepted: false,
        }
    }

    confirm() {
        this.props.navigation.dispatch(navigateWithDisabledBack('WalletOption'));
    }

    render() {
        return(
            <View style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flex: 1,
                marginTop: 60,
            }}>
                <Text style={{
                    color: Config.theme.primaryColour,
                    fontSize: 25,
                    marginBottom: 40,
                    marginLeft: 30,
                    marginRight: 20
                }}>
                    Before we continue, please take a minute to read and agree to the below statements.
                </Text>

                {Config.feePercentage > 0 && <View style={{ flexDirection: 'row', marginRight: 20, marginLeft: 25, marginBottom: 20 }}>
                    <Switch
                        value={this.state.feeAccepted}
                        onValueChange={(value) => {
                            this.setState({
                                feeAccepted: value
                            });
                        }}
                        style={{ marginRight: 15 }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15 }}>
                            I understand that the fee for sending transactions is {Config.feePercentage}%.
                        </Text>
                    </View>
                </View>}

                <View style={{ flexDirection: 'row', marginRight: 20, marginLeft: 25, marginBottom: 20 }}>
                    <Switch
                        value={this.state.keyOwnershipAccepted}
                        onValueChange={(value) => {
                            this.setState({
                                keyOwnershipAccepted: value
                            });
                        }}
                        style={{ marginRight: 15 }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15 }}>
                            I understand that I am the sole owner of my private keys/seed, and if I lose them, my wallet cannot be recovered.
                        </Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', marginRight: 20, marginLeft: 25, marginBottom: 20 }}>
                    <Switch
                        value={this.state.warrantyAccepted}
                        onValueChange={(value) => {
                            this.setState({
                                warrantyAccepted: value
                            });
                        }}
                        style={{ marginRight: 15 }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15 }}>
                            I understand that no warranty or guarantee is provided, expressed, or implied when using this app and any funds lost in using this app are not the responsibility of the application creator, publisher, or distributor.
                        </Text>
                    </View>

                </View>

                <BottomButton
                    title="Continue"
                    onPress={() => {
                        this.props.navigation.navigate('SetPin', { nextRoute: this.props.navigation.state.params.nextRoute })
                    }}
                    disabled={!this.state.feeAccepted || !this.state.keyOwnershipAccepted || !this.state.warrantyAccepted}
                />
            </View>
        );
    }
}
