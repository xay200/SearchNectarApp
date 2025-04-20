// src/screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { products } from '../data/data';
import Icon from 'react-native-vector-icons/Ionicons';

const allCategories = [...new Set(products.map((product) => product.category))];
const allBrands = [...new Set(products.map((product) => product.brand))];

const { width: screenWidth } = Dimensions.get('window');
const productCardWidth = (screenWidth - 40) / 2;

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState(allCategories);
  const [selectedBrands, setSelectedBrands] = useState(allBrands);

  useEffect(() => {
    if (route.params?.selectedCategories) {
      setSelectedCategories(route.params.selectedCategories);
    }
    if (route.params?.selectedBrands) {
      setSelectedBrands(route.params.selectedBrands);
    }
  }, [route.params]);

  useEffect(() => {
    let filtered = products;

    filtered = filtered.filter(
      (product) =>
        selectedCategories.includes(product.category) &&
        selectedBrands.includes(product.brand)
    );

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, selectedBrands]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery(''); // Xóa nội dung tìm kiếm
  };

  const renderProduct = ({ item }) => (
    <View style={[styles.productCard, { width: productCardWidth }]}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDetails}>
        {item.weight}, Price
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Egg"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length >= 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
              <Icon name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter')}
          style={styles.filterIcon}
        >
          <Icon name="filter-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 48.3, // Thêm khoảng cách từ mép trên
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: 324.8212890625,
    height: 51.56840133666992,
    marginLeft: 15.01,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    //paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    marginRight: 10,
  },
  filterIcon: {
    right: 5,
    padding: 5,
  },
  productCard: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 173.3249969482422,
    height: 248.50999450683594,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  productImage: {
    width: 121.68871307373047,
    height: 121.68871307373047,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  productDetails: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    marginLeft: 35,
    backgroundColor: '#53B175',
    borderRadius: 17,
    width: 45.66999816894531,
    height: 45.66844940185547,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 26,
  },
  row: {
    justifyContent: 'flex-start',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default SearchScreen;