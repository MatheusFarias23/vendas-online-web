import Tooltip from '../../../shared/components/tooltip/Tooltip';
import type { ProductType } from '../../../shared/types/ProductType';
import { ImageProduct } from '../styles/tooltipImage.style';

interface ToolTipImageProps {
  product: ProductType;
}

const ToolTipImage = ({ product }: ToolTipImageProps) => {
  return (
    <Tooltip tooltip={<ImageProduct src={product.image}></ImageProduct>}>
      <span>{product.id}</span>
    </Tooltip>
  );
};

export default ToolTipImage;
