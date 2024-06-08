const add = document.getElementById("addBtn");
const notesbox = document.getElementById("main"); 
const gettitle = () => {
  const titles = Array.from(document.getElementsByTagName('input'));
  const labels = Array.from(document.getElementsByTagName('label'));
  titles.forEach((title, index) => {
    title.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        labels[index].innerText = e.target.value;
        title.style.display = 'none';
        labels[index].style.display = 'flex';
      }
    });

    labels[index].addEventListener('click', () => {
      title.style.display = 'block';
      labels[index].style.display = 'none';
    });
  });
};

const save = ( ) => {
  let data = [];
  let texts = Array.from(document.querySelectorAll(".note textarea"));
  let labels =Array.from(document.querySelectorAll('.note label'));
  for(i=0; i<texts.length;i++){
    data.push({title:labels[i].innerHTML,text:texts[i].value});
  }
  localStorage.setItem('data',JSON.stringify(data));
}
add.addEventListener('click', () => {
  addnote();
})
const addnote = (title="",text="",index) => {
   
  let note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `   
                  <div class="tool">
                      <i class="fas fa-save"></i>
                      <i class="fas fa-trash"></i>
                  </div>
                  <input type="text"  placeholder="Enter title">
                  <label>${title}</label>
                  <textarea>${text}</textarea>`;
  notesbox.appendChild(note);
  let currenttitle =Array.from(document.querySelectorAll('.note label'))
  let currentinput = Array.from(document.querySelectorAll('.note input'))
  console.log(currentinput[index])
   if(title!==''){
       currenttitle[index].style.display='flex';
         
           currentinput[index].style.display='none';
   }
  note.querySelector(".fa-trash").addEventListener('click', () => {

    note.remove( );

    save( );

  })
  note.querySelector(".fa-save").addEventListener('click', () => {
    save( );
  })
   
   
  gettitle();
}

(
  function (){
  const lsnotes=JSON.parse(localStorage.getItem('data'));
    if(lsnotes==null){
      
    addnote();
    }
    else{
      lsnotes.forEach((e,index)=>{
      addnote(e.title,e.text,index);
      })
    }
  }
)()
