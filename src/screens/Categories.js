import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Image,
    ActivityIndicator,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { useState, useEffect } from "react";
  import { Colors } from "../constants/Colors";
  import { BackgroundImages } from "../constants/BackgroundImages";
  import { TabView, SceneMap } from "react-native-tab-view";
  import { noTabBar, renderTabBar } from "../components/TabBar";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import {
    loadPreviewProducts,
    selectPreviewProducts,
  } from "../redux/PreviewSlice";
  
  export default function Categories() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { previewProducts, loading, error } = useSelector(
      selectPreviewProducts
    );
  
    useEffect(() => {
      dispatch(loadPreviewProducts());
    }, [dispatch]);
  
    const goToCategoryScreen = (category) => {
      navigation.navigate("ProductList", category);
    };
  
    const getProductsByCategory = () => {
      const categoryGroup = {};
      previewProducts.forEach((product) => {
        const category = product.category;
        if (!categoryGroup[category]) {
          categoryGroup[category] = [];
        }
        categoryGroup[category].push(product);
      });
      return categoryGroup;
    };
  
    const categoryGroup = getProductsByCategory();
  
    const generateCategoryTab = () => {
      const productTabs = {};
      Object.keys(categoryGroup).forEach((category, index) => {
        productTabs[`tab${index}`] = () => (
          <View style={styles.productPage}>
            {categoryGroup[category].map((item) => (
              <View key={item.id} style={styles.productContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productPrice}>{`$${item.price}`}</Text>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => goToCategoryScreen(category)}
                style={styles.tabButton}
              >
                <Text
                  style={styles.buttonText}
                >{`Explore More in ${category}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return productTabs;
    };
  
    const getBackgroundImageForCategory = (category) => {
      switch (category) {
        case "jewelery":
          return BackgroundImages.Jewelery;
        case "electronics":
          return BackgroundImages.Electronics;
        case "men's clothing":
          return BackgroundImages.Mens;
        case "women's clothing":
          return BackgroundImages.Womens;
        default:
          return null;
      }
    };
  
    const generateTabs = () => {
      const tabs = {};
      Object.keys(categoryGroup).forEach((category, index) => {
        const backgroundImage = getBackgroundImageForCategory(category);
        tabs[`tab${index}`] = () => (
          <View style={styles.tabPage}>
            {backgroundImage && (
              <Image source={backgroundImage} style={styles.backgroundImage} />
            )}
            <Text style={styles.textBanner}>{category}</Text>
          </View>
        );
      });
      return tabs;
    };
  
    const renderFirstScene = SceneMap(generateTabs());
    const renderSecondScene = SceneMap(generateCategoryTab());
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const routes = Object.keys(categoryGroup).map((category, index) => ({
      key: `tab${index}`,
      title: category,
    }));
    return loading ? (
      <ActivityIndicator
        style={styles.loadingFigure}
        size="large"
        color="#0000ff"
      />
    ) : (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.firstTabView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderFirstScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={noTabBar}
          />
        </View>
        <View style={styles.secondTabView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderSecondScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.GrayishWhite,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    loadingFigure: {
      flex: 1,
      justifyContent: "center",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: 300,
    },
    firstTabView: {
      height: 270,
      marginTop: 20,
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      borderColor: Colors.Black,
    },
    secondTabView: {
      height: 600,
    },
    tabPage: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      height: 300,
    },
    tabText: {
      fontSize: 12,
      fontFamily: "Lato-Bold",
      color: Colors.DarkestBlue,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    textBanner: {
      textAlign: "center",
      fontSize: 38,
      textTransform: "uppercase",
      fontFamily: "Poppins-Bold",
      color: Colors.Peach,
      width: 350,
      letterSpacing: 8,
    },
    productPage: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.GrayishWhite,
    },
    productContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
      width: 180,
      height: 180,
      backgroundColor: "white",
      borderRadius: 6,
      elevation: 5,
    },
    productImage: {
      width: 100,
      height: 100,
      resizeMode: "center",
    },
    productPrice: {
      fontSize: 14,
      fontFamily: "Lato-Regular",
      position: "absolute",
      color: Colors.DarkestBlue,
      bottom: 10,
      left: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 20,
      height: 40,
      backgroundColor: "transparent",
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      borderColor: Colors.Black,
    },
    buttonText: {
      fontFamily: "Poppins-Regular",
      textTransform: "uppercase",
      fontSize: 12,
      letterSpacing: 2,
      color: Colors.DarkestBlue,
    },
  });
  