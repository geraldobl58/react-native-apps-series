import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as theme from '../theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  flex: {
    flex: 1
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  back: { 
    width: theme.sizes.base * 3, 
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  content: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    padding: theme.sizes.padding,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2, 
    height: theme.sizes.padding * 2, 
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.caption,
    borderColor: theme.colors.white,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: 'bold',
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 1.5,
    color: theme.colors.caption,
  }
});


class Article extends Component {

  scrollX = new Animated.Value(0);

  static navigationOptions = ({ navigation }) => ({
    
    header: (
      <View style={[ styles.flex, styles.row, styles.header ]}>
        <TouchableOpacity style={[ styles.back ]} onPress={() => navigation.goBack()} >
          <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />
        </TouchableOpacity>
      </View>
    ),
    headerTransparent: true
  });

  renderDots() {
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View style={[ styles.flex, styles.row, { justifyContent: 'center', alignItems: 'center' } ]}>
        {article.images.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index -1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View 
                key={`step-${item}-${index}`} 
                style={[styles.dots, { opacity }]} />
          )
        })}
      </View>
    )
  }

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return (
      stars.map((_, index) => {
        const activeStar = Math.floor(rating) >= (index + 1);
        return (
          <FontAwesome 
              name='star' 
              key={`star-${index}`} 
              size={theme.sizes.font}
              color={theme.colors[activeStar ? 'active' : 'gray']} 
              style={{ marginRight: 4 }}
          />
        )
      })
    )
  }

  render() {

    const { navigation } = this.props;
    const article = navigation.getParam('article');

    return (
      <View style={styles.flex}>
          <View style={[ styles.flex, { marginBottom: -theme.sizes.margin } ]}>
           <ScrollView 
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
           >
           {
             article.images.map((img, index) => (
              <Image 
                key={`${index}-${img}`} 
                source={{ uri: img }} 
                resizeMode='cover' 
                style={{ width, height: width }} />
            ))
           }
           </ScrollView>
           {this.renderDots()}
          </View>
        <View style={[ styles.flex, styles.content ]}>
          <View style={[ styles.flex, styles.contentHeader ]}>
            <Image style={[ styles.avatar, styles.shadow ]} source={{ uri: article.user.avatar }} />
            <Text style={styles.title}>{article.title}</Text>
            <View style={[ styles.row, { alignItems: 'center', marginVertical: theme.sizes.margin / 2 } ]}>
              {this.renderRatings(article.rating)}
              <Text style={{ color: theme.colors.active }}>
                {article.rating}
              </Text>
              <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                ({article.reviews} Visitas)
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.description}>
                {article.description.split('').slice(0, 180)}...
                <Text style={{ color: theme.colors.active }}> Ver Mais</Text>
              </Text>
            </TouchableOpacity>

         </View>
        </View>
      </View>
    );
  }

}

export default Article;