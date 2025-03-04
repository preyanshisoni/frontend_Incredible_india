import { SearchAll } from "@/redux/slice/PlaceSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Search = ({ isScrolled }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLine, setShowLine] = useState(false);
  const dispatch = useDispatch();
  const router =  useRouter();
  
  const searchResults = useSelector((state) => state.places.searchAll);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      dispatch(SearchAll({ query }));  
    }
  };
  const handlePlaceClick = (type,id,stateName,parentId,cityName)=>{
    setSearchTerm("");
    
       if(type=="place"){
    router.push(`/placeDetails/${id}`);
  }
  else{
    if(parentId==="null"){
     
        sessionStorage.setItem("setStorageId", id);
        router.push(`/place-to-visit/${cityName}`);
    }else{
        sessionStorage.setItem("setStorageId", id);
        router.push(`/place-to-visit/${stateName}/${cityName}`);
    }
}
}



  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <IoSearchCircleSharp
        size={32}
        style={{ color: isScrolled ? "black" : "white", cursor: "pointer" }}
        onClick={() => setShowLine(!showLine)}
      />

      
      {showLine && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          style={{
            position: "absolute",
            top: "-1px",
            right: "34px",
            width: "160px",
            height: "20px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: `2px solid ${isScrolled ? "black" : "white"}`,
            outline: "none",
            color: isScrolled ? "black" : "white",
            // color:"black",
            fontSize: "16px",
            padding: "2px",
          }}
        />
      )}

      
      {searchTerm.length > 0 && searchResults.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "25px",
            right: "-6px",
            width: "200px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            listStyleType: "none",
            padding: "5px",
            maxHeight: "800px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {searchResults.map((place, index) => (
            <li
              key={index}
              style={{
                padding: "8px",
                borderBottom: "1px solid gray",
                cursor: "pointer",
              }}

              onClick={() => {
                console.log("Selected:", place.name);
                setSearchTerm(place.name);
                handlePlaceClick(
                  place.type,
                  place.id,
                  place.parent_id ? place.parent_id.name : "", 
                  place.parent_id ? place.parent_id : "null",  
                  place.name
                );
              }}
              
            >
              {place.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
