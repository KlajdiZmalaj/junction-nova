import {
  Paginator,
  PaginatorLastPageLinkOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPageLinksOptions,
  PaginatorPrevPageLinkOptions,
} from "primereact/paginator";
import { classNames } from "primereact/utils";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export const DEFAULT_TAKE = 15;

const perPagesDefault = [15, 50, 100];

export default ({
  page,
  itemCount,
  pageCount,
  onPageChange,
  onTakeChange,
  take,
  perPages,
  perPagesDouble,
}: PaginationPropTypes) => {
  const [perPage, setPerPage] = useState(take || DEFAULT_TAKE);

  useEffect(() => {
    onTakeChange?.(perPage);
  }, [perPage]);

  return (
    <div className="paginationWrapper">
      <div className="perPage">
        <span className="text-label-s">Numero righe : </span>
        {(perPages || perPagesDefault).map((i) => (
          <button onClick={() => setPerPage(i)} className={perPage === i ? "active" : ""} key={i}>
            {perPagesDouble ? i * 2 : i}
          </button>
        ))}
      </div>
      <Paginator
        template={template}
        first={(page - 1) * (take || DEFAULT_TAKE)}
        rows={take || DEFAULT_TAKE}
        totalRecords={itemCount}
        onPageChange={({ page: pageGot }) => onPageChange(pageGot + 1)}
      />
    </div>
  );
};

const template = {
  layout: "PrevPageLink PageLinks NextPageLink LastPageLink ",
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <Icon icon="arrow-left" />
      </button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <Icon icon="arrow-right" />
      </button>
    );
  },
  PageLinks: (options: PaginatorPageLinksOptions) => {
    if (
      (options.view.startPage === options.page && options.view.startPage !== 0) ||
      (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
    ) {
      const className = classNames(options.className, { "p-disabled": true });

      return (
        <span className={className} style={{ userSelect: "none" }}>
          ...
        </span>
      );
    }

    return (
      <button type="button" className={options.className} onClick={options.onClick}>
        {options.page + 1}
      </button>
    );
  },
  LastPageLink: (options: PaginatorLastPageLinkOptions) => {
    return <span>{options.props.totalRecords}</span>;
  },
};

export type IPaginationResponse = {
  page: number;
  take: number;
  pageCount: number;
  itemCount: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export const IPaginationDefault = {
  page: 1,
  take: DEFAULT_TAKE,
  pageCount: 2,
  itemCount: DEFAULT_TAKE,
};
type PaginationPropTypes = {
  onPageChange: (pageGot: number) => void;
  onTakeChange: (perPapge: number) => void;
  page: number;
  take: number;
  pageCount: number;
  itemCount: number;
  perPages?: number[];
  perPagesDouble?: boolean;
};
