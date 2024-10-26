import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

interface ITodo{
  id: string,
  title: string,
  isCompleted: boolean
}
export default function App() {

  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const addTodo = () => {
    if(inputText.trim() === ''){
      alert('Please enter a to-do item')
      return
    }
    const todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: inputText,
      isCompleted: false,
    }
    setTodoList([...todoList, todo]);
    setInputText('');
    alert('Todo item added successfully!!!')
  }
  const handlePress = (item: ITodo) => {
    item.isCompleted = !item.isCompleted;
    setTodoList([...todoList]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.titile}>To-Do-List</Text>
          <TextInput placeholder='Enter todolist...' style={styles.input} onChangeText={(value) => setInputText(value)} value={inputText}></TextInput>
          <View style={styles.button}>
            <Button title='Add to do' onPress={addTodo} color={'#DC7C21'}></Button>
          </View>
      </View>
      <View style={styles.list}>
       {todoList.length > 0 ? (
        <>
        <Text style={styles.listTitle}>LIST TO DO</Text>
          <View style={styles.listItem}>
              <FlatList data={todoList} 
              keyExtractor={item => item.id}
              renderItem={({item}) =>{
                return(
                  <View style={styles.blockItem}>
                    <Text  style={styles.item}>{item.title}</Text>
                    <Button color={'#04AA6D'} onPress={() => handlePress(item)} title={item.isCompleted? 'Complete' : 'In Process'} disabled={item.isCompleted}></Button>
                  </View>
                )
              }}></FlatList>
          </View>
          </>) : <Text style={styles.noItem}>There are no missions!</Text>
}
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '30%',
    padding: 20,
    justifyContent: "space-around",
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  titile:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC7C21",
    textAlign: "center",
  },
  input:{
    padding: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderColor: "#CDCDCD",
    marginBottom: 10,
    fontSize: 16,
  },
  button:{
    alignItems: "center",
    flexDirection: "row-reverse"
  },
  list:{
    height: '70%',
    padding: 10,
  },
  listTitle:{
    fontSize: 16,
    fontWeight: "bold",
    borderBlockColor: "#CDCDCD",
    borderBottomWidth: 2,
    marginHorizontal: 'auto'
  },
  listItem:{
      padding: 10
  },
  item:{
    fontSize: 16,
    marginBottom: 5,
  },
  noItem:{
    fontSize: 16,
    color: "#CDCDCD",
    fontWeight: "bold",
    marginHorizontal: 'auto',
  }, 
  blockItem:{
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderStyle: "solid",
  },
 
});
