import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, ScrollView, FlatList, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import * as theme from '../theme';

const { width, height } = Dimensions.get('window');

const mocks = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Futura Beach',
    temperature: 34,
    title: 'Sunset',
    description: 'He watched the sunset at the horizon, spreading its largess into a grateful sky.',
    rating: 4.3,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1496566084516-c5b96fcbd5c8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543527669-db17578033ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471085507142-12355181f804?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470497409162-889ff0ac5726?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480881483301-1774ad3060bc?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 2,
    user: {
      name: 'Jane Doe',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    saved: false,
    location: 'Panaghia Kapnikarea',
    temperature: 30,
    title: 'Deméter',
    description: 'If you are looking for travel inspiration, visitgreece.gr has everything you need to know.',
    rating: 4.6,
    reviews: 3010,
    preview: 'https://images.unsplash.com/photo-1563034929-12f5524c17a3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1422477095642-267ff594ab73?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 3,
    user: {
      name: 'Mark Miller',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    saved: true,
    location: 'Greek Muses',
    temperature: 29,
    title: 'Muses ',
    description: 'Greek mythology is rich with gods and goddesses, but none were as influential as the nine Muses who were created to give inspiration, knowledge, artistry, and music to the ancient world. Each of the nine Greek Muses are listed below.',
    rating: 5,
    reviews: 2822,
    preview: 'https://images.unsplash.com/photo-1525078156886-afd74cba47e0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507475380673-1246fa72eeea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505883973882-490ee8cd39da?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 4,
    user: {
      name: 'Thomas Fill',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    saved: true,
    location: 'The Greek Village',
    temperature: 22,
    title: 'Mediterranean Cuisine',
    description: 'Greece is a mountainous land with thousand of smaller settlements usually with no economic or geopolitical significance, for the countrys standards . The last forty years have shown a clear trend of a steady prolonged reduction of population at these smaller settlements, for the benefit of larger cities like Athens and the other prefectural capitals.',
    rating: 4.7,
    reviews: 5934,
    preview: 'https://images.unsplash.com/photo-1506877339221-ede41280a7a2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523220060347-c568c35f7180?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?auto=format&fit=crop&w=800&q=80',
    ]
  }
]

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
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  articles: {
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: -24,
    right: theme.sizes.padding,
    left: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },
  recommended: {
   
  },
  recommendedHeader: { 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    paddingHorizontal: theme.sizes.padding, 
    marginVertical: theme.sizes.margin * 0.66
  },
  recommendedList: {
    
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden'
  },
  recommendationHeader: {
    overflow: 'hidden', 
    borderTopLeftRadius: theme.sizes.border, 
    borderTopRightRadius: theme.sizes.border
  },
  recommendationTemperature: {
    fontSize: theme.sizes.font * 1.25, 
    color: theme.colors.white
  },
  recommendationInfo: { 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: theme.sizes.padding / 2, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0 
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },
  avatar: {
    width: theme.sizes.padding, 
    height: theme.sizes.padding, 
    borderRadius: theme.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: 'bold'
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
    backgroundColor: theme.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  }

});


class Articles extends Component {

  scrollX = new Animated.Value(0);

  static navigationOptions = {
    header: (
      <View style={[ styles.row, styles.header ]}>
        <View>
          <Text style={{ color: theme.colors.caption }}>Pesquisar Lugares</Text>
          <Text style={{ fontSize: theme.sizes.font * 2 }}>Destinos</Text>
        </View>
        <View>
          <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} />
        </View>
      </View>
    )
  }

  renderDots() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View style={[ styles.flex, styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: (theme.sizes.margin * 2) } ]}>
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index -1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          
          return (
            <Animated.View 
                key={`step-${item.id}`} 
                style={[styles.dots, { borderWidth }]} />
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
          />
        )
      })
    )
  }

  renderDestinations = () => {
    return (
      <View style={[styles.column, styles.destinations]}>
        <FlatList 
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          // style={{ overflow: 'visible' }}
          data={this.props.destinations}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
          renderItem={({ item }) => this.renderDestination(item)}
        />
        {this.renderDots()}
      </View>
    )
  }

  renderDestination = item => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
        <ImageBackground 
          style={[styles.flex, styles.destination, styles.shadow]} 
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{uri: item.preview}}
          >
          <View style={[styles.row, { justifyContent: 'space-between', }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            </View>
            <View style={[ styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.user.name}</Text>
              <Text style={{ color: theme.colors.white }}>
              <Octicons name='location' size={theme.sizes.font * 0.8} color={theme.colors.white} />
                <Text>  {item.location}</Text>
              </Text>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
          <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
            <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8 }}>{item.title}</Text>
            <View style={[ styles.row, { justifyContent: 'space-between', alignItems: 'flex-end' } ]}>
              <Text style={{ color: theme.colors.caption }}>
                  {item.description.split('').slice(0, 30)}...
              </Text>
              <FontAwesome name='chevron-right' size={theme.sizes.font * 0.75} color={theme.colors.caption} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  renderRecommended = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended]}>
        <View style={[styles.row, styles.recommendedHeader]}>
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recomendações</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.caption }}>Ver Mais</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList 
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            data={this.props.destinations}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderRecommendation(item, index)}
          />
        </View>
      </View>
    )
  }

  renderRecommendation = (item, index) => {

    const { destinations } = this.props;
    const isLastItem = index === destinations.length - 1;

    return (
      <View style={[ 
        styles.flex, styles.column, 
        styles.recommendation, styles.shadow, 
        index === 0 ? { marginLeft: theme.sizes.margin } : null, 
        isLastItem ? { marginRight: theme.sizes.padding / 2 } : null, 
      ]}>
        <View style={[ styles.flex, styles.recommendationHeader ]}>
          <Image style={[ styles.recommendationImage ]} source={{ uri: item.preview }} />
          <View style={[ styles.flex, styles.row, styles.recommendationInfo ]}>
            <Text style={[ styles.recommendationTemperature ]}>{item.temperature}℃</Text>
            <FontAwesome 
              name={item.saved ? 'bookmark' : 'bookmark-o'} 
              size={theme.sizes.font * 1.25} 
              color={theme.colors.white} 
            />
          </View>
        </View>
        <View style={[ styles.flex, styles.column, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 } ]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5 }}>{item.title}</Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View style={[ styles.row, { alignItems: 'center', justifyContent: 'space-between', marginTop: theme.sizes.margin } ]}>
            {this.renderRatings(item.rating)}
            <Text style={{ color: theme.colors.active }}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView showVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: theme.colors.padding, }}>
        {this.renderDestinations()}
        {this.renderRecommended()}
      </ScrollView>
    );
  }

}

Articles.defaultProps = {
  destinations: mocks
};

export default Articles;