import image from '@/assets/images/chart/informations/video.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VideoConfig: ConfigType = {
  key: 'Video',
  chartKey: 'VVideo',
  conKey: 'VCVideo',
  title: '视频',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
}
