export interface SearchResult {
  location: any;
  name: string;
  condition: any;
  country: string;
  temp_c: string;
  text: string;
  icon: string;
}

export interface SearchError {
  Response: string;
  Error: string;
}

export const useAPI = () => {
  const url = "http://api.weatherapi.com/v1/current.json";
  const apiKey = "";

  const searchData = async (
    name: string
  ): Promise<SearchResult[] | SearchError> => {
    const result = await fetch(
      url + "?key=" + apiKey + "&q=" + name + "&aqi=no"
    );
    return result.json();
  };

  return {
    searchData,
  };
};

export default useAPI;
