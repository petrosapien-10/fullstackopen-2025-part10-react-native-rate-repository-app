import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import React from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
    padding: 0,
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemLast: {
    borderBottomWidth: 0,
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedItem: {
    backgroundColor: "#f0f0f0",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  selectedSorting,
  setSorting,
  searchKeyword,
  setSearchKeyword,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sortingOptions = [
    { label: "Latest repositories", value: "latest" },
    { label: "Highest rated repositories", value: "highest" },
    { label: "Lowest rated repositories", value: "lowest" },
  ];

  const selectedOption = sortingOptions.find(
    (option) => option.value === selectedSorting
  );

  const handleSelectOption = (value) => {
    setSorting(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        autoCapitalize="none"
      />
      <Pressable
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedOption?.label || "Select sorting"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {sortingOptions.map((option, index) => (
              <Pressable
                key={option.value}
                style={[
                  styles.modalItem,
                  index === sortingOptions.length - 1 && styles.modalItemLast,
                  option.value === selectedSorting && styles.selectedItem,
                ]}
                onPress={() => handleSelectOption(option.value)}
              >
                <Text style={styles.modalItemText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <>
        <RepositoryListHeader
          selectedSorting={props.sorting}
          setSorting={props.setSorting}
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
        />
        <ItemSeparator />
      </>
    );
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const renderItem = ({ item }) => (
      <Pressable onPress={() => this.props.navigate(`/repository/${item.id}`)}>
        <RepositoryItem repository={item} />
      </Pressable>
    );

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const getOrderVariables = (sortingValue) => {
    switch (sortingValue) {
      case "latest":
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
      case "highest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  };

  const orderVariables = getOrderVariables(sorting);

  const variables = {
    ...orderVariables,
    searchKeyword: debouncedSearchKeyword || undefined,
  };
  const { repositories, loading, error } = useRepositories(variables);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      sorting={sorting}
      setSorting={setSorting}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
