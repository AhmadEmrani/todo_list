class Node
{
    constructor(data, left=null , right=null ) {
        this.data = data;
        this.left = left;
        this.right = right;

    }
    bst_sub = new BST();
    desription = " ";
}

class BST
{
    constructor() {
        this.root=null;
    }
    add(data)
    {
        const node = this.root;
        if(node === null)
        {
            this.root = new Node(data);
            return;
        }
        else
        {
            const searchtree = function (node)
            {
                if(data < node.data)
                {
                    if(node.left === null)
                    {
                        node.left = new Node(data);
                        return;
                    }
                    else if(node.left != null)
                    {
                        return searchtree(node.left);
                    }
                }
                else if(data > node.data)
                {
                    if(node.right === null)
                    {
                        node.right = new Node(data);
                        return;
                    }
                    else if(node.right != null)
                    {
                        return searchtree(node.right);
                    }
                }
                else
                {
                    return null;
                }
            };
            return searchtree(node);
        }
    }
    find_min()
    {
        let current = this.root;
        while(current.left !== null)
        {
            current = current.left;
        }
        return current.data;
    }
    find_max()
    {
        let current = this.root;
        while(current.right !== null)
        {
            current = current.right;
        }
        return current.data;
    }
    find(data)
    {
        let current = this.root;
        while(current.data !== data)
        {
            if(data < current.data)
            {
                current = current.left;
            }
            else
            {
                current = current.right;
            }
            if(current === null)
            {
                return null;
            }
        }
        return current;
    }
    ispresent(data)
    {
        let current = this.root;
        while(current)
        {
            if(data===current.data)
            {
                return true;
            }
            if(data < current.data)
            {
                current = current.left;
            }
            else
            {
                current = current.right;
            }
        }
        return false;
    }
    remove(data)
    {
        const removeNode = function (node,data)
        {
            if(node== null)
            {
                return null;
            }
            if(data === node.data)
            {
                // no child
                if (node.left == null && node.right == null)
                {
                    return null
                }
                // one child
                if(node.left==null)
                {
                    return node.right;
                }
                if(node.right==null)
                {
                    return node.left;
                }
                //two
                var tempnode = node.right;
                while(tempnode.left !== null)
                {
                    tempnode = tempnode.left;
                }
                node.data = tempnode.data;
                node.right = removeNode(node.right , tempnode.data);
                return node;
            }
            else if(data < node.data)
            {
                node.left = removeNode(node.left , data);
                return node;
            }
            else
            {
                node.right = removeNode(node.right , data);
                return node;
            }
        }
        this.root = removeNode(this.root,data);
    }
    inorder()
    {
        if(this.root==null)
        {
            return null;
        }
        else
        {
            var result = new Array();
            function traverseInorder(node)
            {
                node.left && traverseInorder(node.left);
                result.push(node);
                node.right && traverseInorder(node.right);
            }
            traverseInorder(this.root);
            return result;

        }
    }

}








bst_main_tasks = new BST();
// bst.add(1);
// bst.add(2);
// bst.add(3);
// bst.add(4);
// bst.add(8);
// console.log(bst.find_min());
// bst.remove(1);
// console.log(bst.find_min());
// console.log(bst.inorder());
// node = new Node();
// node.desription = "hi";
// console.log(node.desription);
// const bst = new BST();
// bst.add(1);
// bst.find(1).desription="now";
// console.log(bst.find(1).desription);
// console.log(bst.inorder());
// inorder_emtehani =[];
// for(i = 0 ; i < bst.inorder().length ; i++)
// {
//     inorder_emtehani[i]=bst.inorder()[i];
// }
// console.log(inorder_emtehani[0].desription);
// load_BST();


const inputBox = document.getElementById("input-box")
const listcontainer = document.getElementById("list-container")
const input_task_time = document.getElementById("input-task-time")
function removeALLchildNodes(parent)
{
    while (parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}
function addTask()
{
    if(inputBox.value==='')
    {
        alert("you must write a task");
    }
    else if(input_task_time.value <= 0)
    {
        alert("you must set a deadline");
    }
    else
    {
        bst_main_tasks.add(input_task_time.value);
        bst_main_tasks.find(input_task_time.value).desription=inputBox.value;

        update();


        // let li = document.createElement("li");
        // li.innerHTML=inputBox.value;
        // listcontainer.appendChild(li);
        // let span = document.createElement("span")
        // span.innerHTML= "\u00d7";
        // li.appendChild(span);
    }
    inputBox.value='';
    input_task_time.value=0;
}



function update()
{
    const list_task_and_sub = document.getElementById("list-Task_and_subtask");
    const inorder_task_main = bst_main_tasks.inorder();
    if(inorder_task_main === null)
    {
        removeALLchildNodes(list_task_and_sub);
    }
    else
    {
        removeALLchildNodes(list_task_and_sub);
        for (i = 0; i < inorder_task_main.length; i++)
        {
            console.log("update down div sucess");
            let ul = document.createElement("ul");
            ul.innerHTML = inorder_task_main[i].desription + " "+ ":";
            list_task_and_sub.appendChild(ul);

            const inorder_subtask = inorder_task_main[i].bst_sub.inorder();
            if(inorder_subtask === null)
            {}
            else
            {
                for (k = 0; k < inorder_subtask.length; k++)
                {

                    let li = document.createElement("li");
                    li.innerHTML = inorder_subtask[k].desription + " " + "deadline :" + " " + inorder_subtask[k].data.toString();
                    list_task_and_sub.appendChild(li);
                    let span = document.createElement("span")
                    span.innerHTML = "\u00d7";
                    li.appendChild(span);

                }
            }

        }
    }
    const  inorder_tasks = bst_main_tasks.inorder();
    if(inorder_tasks===null)
    {
        removeALLchildNodes(listcontainer);
        console.log("ok");
    }
    else
    {
        removeALLchildNodes(listcontainer);
        for (i = 0; i < inorder_tasks.length; i++)
        {
            console.log("ok");
            let li = document.createElement("li");
            li.innerHTML = inorder_tasks[i].desription + " " + "deadline :" + " " + inorder_tasks[i].data.toString();
            listcontainer.appendChild(li);
            let span = document.createElement("span")
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        }
    }
}








// delete operation for main task -->


listcontainer.addEventListener("click" , function (e){
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN")
    {
        //console.log(e.target.parentElement.innerText.split(" "));
        const search_for_desription = e.target.parentElement.innerText.split(" ");
        const  inorder_tasks = bst_main_tasks.inorder();
        for(i=0 ; i < inorder_tasks.length ; i++)
        {

            if(inorder_tasks[i].desription===search_for_desription[0])
            {
                bst_main_tasks.remove(inorder_tasks[i].data);
                console.log("ok");
                e.target.parentElement.remove();

                update();


            }

        }
        // console.log(inorder_tasks);


    }
},false);













/// add sub task ----->






const parenttask = document.getElementById("input-task-to-add-sub");
const subtasknew = document.getElementById("input-subtask")
const subtask_deadline = document.getElementById("input-subtask-time");
const list_task_and_sub = document.getElementById("list-Task_and_subtask");

function addsubtask()
{
    if(parenttask.value ==='' || subtasknew.value ==='' || subtask_deadline.value <= 0)
    {
        alert("please enter name of main task and sub task and deadline :) have great time");
    }
    else
    {
        const inorder_task_main = bst_main_tasks.inorder();
        for(j=0 ; j < inorder_task_main.length ; j++)
        {
            if(inorder_task_main[j].desription === parenttask.value)
            {
                 found_data_number = inorder_task_main[j].data;

                 // false position -->
                if(inorder_task_main[j].data < subtask_deadline.value)
                {
                    alert("you enter wrong deadline please try again");
                    return ;
                }
                else
                {
                    bst_main_tasks.find(found_data_number).bst_sub.add(subtask_deadline.value);
                    bst_main_tasks.find(found_data_number).bst_sub.find(subtask_deadline.value).desription = subtasknew.value;
                }
            }
        }

        // bst_main_tasks.find(found_data_number).bst_sub.add(subtask_deadline.value);
        // bst_main_tasks.find(found_data_number).bst_sub.find(subtask_deadline.value).desription = subtasknew.value;

        // removeALLchildNodes(list_task_and_sub);
        //
        //
        // for(i = 0 ; i < inorder_task_main.length ; i++)
        // {
        //     let ul = document.createElement("ul");
        //     ul.innerHTML = inorder_task_main[i].desription + " " + ":";
        //     list_task_and_sub.appendChild(ul);
        //
        //     const inorder_subtask =inorder_task_main[i].bst_sub.inorder();
        //
        //     for(k=0 ; k <inorder_subtask.length ; k++)
        //     {
        //
        //         let li = document.createElement("li");
        //         li.innerHTML=inorder_subtask[k].desription +" "+"deadline :"+" "+inorder_subtask[k].data.toString();
        //         list_task_and_sub.appendChild(li);
        //         let span = document.createElement("span")
        //         span.innerHTML= "\u00d7";
        //         li.appendChild(span);
        //
        //     }
        //
        //
        // }
        update();

    }
    parenttask.value='';
    subtasknew.value='';
    subtask_deadline.value=0;
}












// done sub task and delete them from tree ---->



list_task_and_sub.addEventListener("click" , function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN")
    {
        const search_for_desription_parent = e.target.parentElement.parentElement.innerText.split(" ");
        const  inorder_tasks = bst_main_tasks.inorder();
         console.log(search_for_desription_parent);
        const search_for_desription_sub =  e.target.parentElement.innerText.split(" ");
         console.log(search_for_desription_sub);
        const all_tasks = bst_main_tasks.inorder();
        console.log(all_tasks);


        for (i =0 ; i < all_tasks.length ; i++)
        {
            if(all_tasks[i].desription === search_for_desription_parent[0])
            {

                // first of all we delete seleted sub task =>

                const subtask_array_bst = all_tasks[i].bst_sub.inorder();

                const data_looking_for_task = all_tasks[i].data;
                for(k=0 ; k < subtask_array_bst.length ; k++)
                {
                    if(subtask_array_bst[k].desription===search_for_desription_sub[0])
                    {
                        const data_delete_from_sub = subtask_array_bst[k].data;

                        //delete the selected sub -->
                        console.log("delete sub sucess");
                        bst_main_tasks.find(data_looking_for_task).bst_sub.remove(data_delete_from_sub);
                    }
                }
                // bst_main_tasks.find(data_looking_for).bst_sub

                const all_tasks_update = bst_main_tasks.inorder();
                const subtask_array_bst_updated = all_tasks_update[i].bst_sub.inorder();
                if(subtask_array_bst_updated === null)// all task done
                {
                    console.log("delete task sucess");
                    bst_main_tasks.remove(data_looking_for_task);
                }

            }
        }

        console.log(all_tasks);



        update();

    }


},false);


///storage ---->


// function storage_BST()
// {
//     localStorage.clear();
//     inorder_Bst_localstorage = bst_main_tasks.inorder();
//     let myobj_serialized = JSON.stringify(bst_main_tasks);
//     console.log(myobj_serialized);
//     localStorage.setItem("BST",myobj_serialized);
//
//
// }
// function load_BST()
// {
//     let myobj_deserilized = JSON.parse(localStorage.getItem("BST"));
//     console.log(myobj_deserilized);
//     bst_main_tasks = myobj_deserilized;
//     update();
// }

