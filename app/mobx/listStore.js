
import {observable} from 'mobx'
// import {filterJson} from '../filterJSON';

let index = 0

class ObservableListStore {

  @observable list = [];
  @observable refreshing = false;
  @observable load_more = false;
  @observable error = false;
  @observable filtered_list = [];
  @observable searching = false;
  @observable needle = "";


  toggleList(screen){
    debugger;
    if(screen=="MAIN" && this.needle.length == 0){
      this.searching=false;
    }else{
      this.searching=true;
    }
  }

  deleteItem(index){
    debugger;
    this.list.splice(index,1);
    console.log(this.list);
  }

  filterJson(person, needle){
    let node = person;
    let decision = false;
	tree_traversal(person);
      function tree_traversal(node) {
        if(Object.keys(node).length != 0) {
          for(var key in node) {
            console.log(key + " : " + node[key]);
          if(key==null || node==null || node[key]==null || Object.keys(node[key]) == null) continue;
            if(typeof node[key] === "object" && Object.keys(node[key]).length > 0 ) {
              tree_traversal(node[key]);
            }else{
                if((""+node[key]).toLowerCase().indexOf(needle.toLowerCase()) !== -1){
                  console.log("found:"+node[key]);
                  decision = true;
                  break;
                }
            }
          }
        } 
      }
      return decision;
  }

  filter(txt){
    debugger;
    let pos = 0;
    let len = this.list.length;
    this.filtered_list = [];
    this.needle = txt;
    console.log(this.filtered_list.length);
    for(pos = 0; pos <len ; pos++){
      let item = this.list[pos];
      {/*
        
       let tempName = item.name.title.trim()+". "+item.name.first.trim()+" "+item.name.last.trim();
      // if(tempName.includes(txt)){
        if(tempName.toLowerCase().indexOf(txt.toLowerCase()) !== -1){
        this.filtered_list.push(item);
      }

      */}
      let found = this.filterJson(item,txt);
      if(found==true){
        this.filtered_list.push(item);
      }
    }
  }

  getItems(){
    debugger;
    this.error = false;
    const List_Data_API = "https://randomuser.me/api/?results=10";
    fetch(`${List_Data_API}`, {
      method: 'GET',
  })
  .then((response) => response.json())
      .then((response) =>{
        debugger;
        console.log('list received',response);
        console.log(JSON.stringify(response));
        // response.results.forEach(item => this.list.push(item));
        for(var i = 0; i<response.results.length; i++){
          this.list.push(response.results[i]);
        }
        this.refreshing = false;
        this.load_more = false;
        console.log('list received',this.list);
      })
      .catch((err) =>{
        this.error = true;
        console.log('ERROR', err.message)
      });
  }

  getList(){
    debugger;
    return this.list;
  }

  loadMore(){
    debugger;
    this.load_more = true;
    this.getItems();
  }

  clearList(){
    // this.list = [];
    // this.refreshing = true;

     this.list = [];
     this.refreshing = false;
     this.load_more = false;
     this.error = false;
     this.filtered_list = [];
     this.searching = false;
     this.needle = "";

    this.getItems();
  }

  addToList(newList){
    for(var i = 0; i<newList.results.length; i++){
      this.list.push(newList.results[i]);
    }
  }
}

const observableListStore = new ObservableListStore()


export default observableListStore