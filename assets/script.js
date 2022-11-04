let searchHistory = [];

function getSearches() {

    // get search history from local storage
    searchHistory = JSON.parse(localStorage.getItem("search"));
  
    $(".searchHistory").empty();   // clear search history div 

    $(searchHistory).each(function (index) {
      let srchBtn = $("<button>")
        .text(searchHistory[index])
        .addClass("btn1 button is-blue ml-1 has-text-centered mt-3");
      $(".recentSearches").append(srchBtn);
    });

    // $(".btn1").click(function (event) {
    //   currentConditions(event.target.innerHTML);
    // });
  }

  function updateSearches(search) {
    if (!searchHistory.includes(search)) {
        searchHistory.push(search);
    
        localStorage.setItem("search", JSON.stringify(searchHistory));
    
        getSearches();
      }
  }