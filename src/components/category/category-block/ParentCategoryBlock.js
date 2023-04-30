import Link from "next/link";
import Image from "../../../image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";

const ParentCategoryBlock = (props) => {
  const { category } = props;

  return (
    <div className="group relative">
      <div className="flex flex-row items-center justify-center space-x-3">
        <img
          className="w-24 h-24 object-cover object-center rounded-full border shadow-2xl"
          src={category?.image?.sourceUrl ?? ""}
          alt={category?.image?.altText ?? category.slug}
        />
        <h3 className="text-sm text-gray-500">
          <Link href={`/danh-muc-san-pham/${category?.slug}`}>
            <a>
              <span className="absolute inset-0"></span>
              {category?.name}
            </a>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default ParentCategoryBlock;
