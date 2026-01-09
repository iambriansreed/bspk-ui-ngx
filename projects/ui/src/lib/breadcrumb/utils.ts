export interface BreadcrumbItem {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     'Page 1';
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     'https://bspk.anywhere.re';
     *
     * @required
     */
    href: string;
}
