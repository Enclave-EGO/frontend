import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { NotFoundImage } from "../../assets";

function NotFound() {
  useEffect(() => updatePageTitle(PageTitle.NOTFOUND), []);

  return (
    <div>
      <img src={NotFoundImage} />
    </div>
  );
}

export default NotFound;
