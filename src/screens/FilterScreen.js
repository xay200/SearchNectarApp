// src/screens/FilterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { products } from '../data/data';
import Icon from 'react-native-vector-icons/Ionicons';

const allCategories = [...new Set(products.map((product) => product.category))];
const allBrands = [...new Set(products.map((product) => product.brand))];

const { width: screenWidth } = Dimensions.get('window');

const FilterScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState(allCategories);
  const [selectedBrands, setSelectedBrands] = useState(allBrands);

  const categories = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
  const brands = ['Individual Collection', 'Cocola', 'Ifad', 'Kozi Farmas'];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const applyFilters = () => {
    navigation.navigate('Search', {
      selectedCategories,
      selectedBrands,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header với nền trắng */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Filters</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Phần nội dung với nền xám */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.checkboxContainer}
              onPress={() => toggleCategory(category)}
            >
              <View style={styles.checkbox}>
                {selectedCategories.includes(category) && (
                  <View style={styles.checked}>
                    <Icon name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.checkboxText}>{category}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Brand</Text>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand}
              style={styles.checkboxContainer}
              onPress={() => toggleBrand(brand)}
            >
              <View style={styles.checkbox}>
                {selectedBrands.includes(brand) && (
                  <View style={styles.checked}>
                    <Icon name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.checkboxText}>{brand}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerPlaceholder: {
    width: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24.071632385253906,
    height: 24.071632385253906,
    borderWidth: 2,
    borderColor: '#53B175',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    width: 24.071632385253906,
    height: 24.071632385253906,
    backgroundColor: '#53B175',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#53B175',
    paddingVertical: 15,
    borderRadius: 19,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterScreen;