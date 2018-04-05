export const filterJson = (person, needle) => {
    debugger;
    console.log('******************');
    console.log(person);
    console.log('******************');
    let decision =false;
      tree_traversal(person);
        function tree_traversal(node) {
          if(Object.keys(node).length != 0) {
            for(var key in node) {
                console.log(key + " : " + node[key] + ":" +  typeof node[key]);
                    if(typeof node[key] === "object" && Object.keys(node[key]).length > 0 ) {
                        tree_traversal(node[key]);
                      }else{
                          if((""+node[key]).toLowerCase().indexOf(needle.toLowerCase()) !== -1){
                            console.log("found:"+node[key]);
                            decision = true;
                          }
                      }
            }
          }
        }
      return decision;
  }
