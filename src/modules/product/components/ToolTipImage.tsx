import { Tooltip } from "antd";
import type { ProductType } from "../../../shared/types/ProductType";

interface ToolTipImageProps {
    product: ProductType;
}

const ToolTipImage = ({ product }: ToolTipImageProps) => {
    return (
        <Tooltip title={product.name}>
            <span>{product.id}</span>
        </Tooltip>
    )
}

export default ToolTipImage;