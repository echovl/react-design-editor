type FontVariant = "300" | "regular" | "400" | "500" | "600" | "700" | "800";

type FontFile = Record<FontVariant, string>;
export interface IFontFamily {
    id: string;
    family: string;
    variants: FontVariant[];
    files: FontFile[];
    subsets: string[];
    version: string;
    lastModified: string;
    category: string;
    kind: string;
}
