import { ContainerExternal, ContainerTooltip } from './Tooltip.style';
import { Tooltip as TooltipAntd } from 'antd';

interface TooltipProps {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  title?: string;
}

const Tooltip = ({ children, tooltip, title }: TooltipProps) => {
  if (title) {
    <TooltipAntd title={title}>{children}</TooltipAntd>;
  }

  return (
    <ContainerTooltip>
      <ContainerExternal>{tooltip}</ContainerExternal>
      {children}
    </ContainerTooltip>
  );
};

export default Tooltip;
