// Library Imports
import React, { Component } from "react";
import { View, WebView, Button } from "react-native";
import TabIcon from "../components/tab_icon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";

// Primary Pages
import Assets from "../pages/assets";
import Details from "../pages/details";
import Exchange from "../pages/exchange";
import Transfer from "../pages/transfer";
import Options from "../pages/options";

// Seconday Pages
import Settings from "../pages/settings";
import Tokens from "../pages/tokens";
import Explorer from "../pages/explorer";
import Review from "../pages/review";

// Auth Pages
import Welcome from "../pages/_auth/welcome";
import Login from "../pages/_auth/login";
import Security from "../pages/_auth/security";
import Seed from "../pages/_auth/seed";
import Validate from "../pages/_auth/validate";
import Restore from "../pages/_auth/restore";
import Vaults from "../pages/_auth/vaults";
import Modal from "../pages/modal";
import Base from "../pages/modal/base";

import { dark, light } from "../constants/themes.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Navigation extends Component {
  state = {
    headerOptions: {
      headerStyle: {
        backgroundColor: "#2B2E32",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
    tabBarOptions: {
      activeTintColor: "#ffffff",
      inactiveTintColor: "#8A8D90",
      style: {
        backgroundColor: "#2B2E32",
      },
    },
  };

  render() {
    const { currentTheme } = this.props;
    const header = {
      headerStyle: {
        backgroundColor:
          currentTheme === "dark"
            ? `${dark.body.foreground}`
            : `${light.body.foreground}`,
      },
      headerTintColor:
        currentTheme === "dark"
          ? `${dark.type.primary}`
          : `${light.type.primary}`,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    };

    const footer = {
      activeTintColor:
        currentTheme === "dark"
          ? `${dark.type.primary}`
          : `${light.type.primary}`,
      inactiveTintColor:
        currentTheme === "dark"
          ? `${dark.type.secondary}`
          : `${light.type.secondary}`,
      style: {
        backgroundColor:
          currentTheme === "dark"
            ? `${dark.body.foreground}`
            : `${light.body.foreground}`,
      },
    };

    const ExchangeStack = () => {
      return (
        <Stack.Navigator screenOptions={header}>
          <Stack.Screen name="Exchange" component={Exchange} />
          <Stack.Screen name="Options" component={Options} />
          <Stack.Screen name="Tokens" component={Tokens} />
          <Stack.Screen name="Review" component={Review} />
        </Stack.Navigator>
      );
    };

    const AssetStack = () => {
      return (
        <Stack.Navigator screenOptions={header}>
          <Stack.Screen name="Assets" component={Assets} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Explorer" component={Explorer} />
        </Stack.Navigator>
      );
    };

    const SettingsStack = () => {
      return (
        <Stack.Navigator screenOptions={header}>
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      );
    };

    const AuthStack = () => {
      return (
        <Stack.Navigator screenOptions={header}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Vaults" component={Vaults} />
          <Stack.Screen name="Restore" component={Restore} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="Seed" component={Seed} />
          <Stack.Screen name="Validate" component={Validate} />
        </Stack.Navigator>
      );
    };

    const TabStack = () => {
      return (
        <Tab.Navigator headerMode="none" mode="modal">
          <Tab.Screen name="Assets" component={AssetStack} />
          <Tab.Screen name="Exchange" component={ExchangeStack} />
          <Tab.Screen name="Transfer" component={Transfer} />
          <Stack.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      );
    };

    const MainStack = () => {
      return (
        <Stack.Navigator headerMode="none" mode="modal">
          <Stack.Screen name="Tabs" component={TabStack} />
          <Stack.Screen name="Modal" component={Modal} />
          <Stack.Screen name="Base" component={Base} />
        </Stack.Navigator>
      );
    };

    const auth = false;
    return (
      <NavigationContainer>
        {auth ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    );
  }
}
export const mapStateToProps = (state) => ({
  currentTheme: state.currentTheme,
});

export default connect(mapStateToProps)(Navigation);
