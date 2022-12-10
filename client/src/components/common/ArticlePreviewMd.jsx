import { Link } from "react-router-dom";

export default function ArticlePreviewMd({
  title,
  summary,
  imgUrl,
  articleUrl,
}) {
  return (
    <div className="flex items-center lg:items-start justify-between gap-4 my-6">
      <Link to={articleUrl} className="w-1/3">
        <img src={imgUrl} />
      </Link>
      <div className="w-2/3 flex flex-col justify-between h-full">
        <h3 className="lg:text-xl text-sm font-primary font-bold hover:text-rose-600 duration-300">
          <Link to={articleUrl}>{title}</Link>
        </h3>
        <div className="hidden lg:block">{summary}</div>
      </div>
    </div>
  );
}
