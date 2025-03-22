function BlueButton(props) {
    return (
        <button class="py-1 px-4 bg-[#00316E] text-white border-2 border-white rounded-full 
        hover:bg-white hover:text-[#00316E] hover:border-[#00316E]">
            {props.content}
        </button>
    );
  }
  
  export default BlueButton;