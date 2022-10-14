import Link from 'next/link';
import Image from "../../../image";
import {DEFAULT_CATEGORY_IMG_URL} from "../../../constants/urls";

const ParentCategoryBlock = ( props ) => {

	const { category } = props;

	return (
		<div className="group relative">
				<div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
            <img src={ category?.image?.sourceUrl ?? '' } alt={category?.image?.altText ?? category.slug} class="h-full w-full object-cover object-center" />
          </div>
          <h3 class="mt-6 text-sm text-gray-500">
		  <Link href={`/danh-muc-san-pham/${category?.slug}`}>
            <a>
              <span class="absolute inset-0"></span>
              {category?.name}
            </a>
			</Link>
          </h3>
		  <p class="text-base font-semibold text-gray-900">{ category?.image?.title ?? '' }</p>			
		</div>
	);
}

export default ParentCategoryBlock;
