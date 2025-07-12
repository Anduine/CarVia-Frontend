import { SearchProvider } from "../../providers/SearchContext";
import LotsList from "../ui/main-lots-list/LotsList";
import SearchMenu from "../ui/search-form/SearchMenu";

function MainPage() {
  return (
    <SearchProvider>
      <SearchMenu />
      <LotsList />
    </SearchProvider>
  );
}

export default MainPage;
