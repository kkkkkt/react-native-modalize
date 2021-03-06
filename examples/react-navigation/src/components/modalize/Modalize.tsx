import * as React from 'react';
import { View } from 'react-native';
import { AbsoluteHeader, SimpleContent, FixedContent, SnappingList, CustomStyle, FlatList, SectionList } from 'react-native-modalize/shared';

import { ModalContext, IState } from '../../../App';

interface IProps {
  context: IState;
}

const modals = [
  { id: 'MODAL_SIMPLE', component: <SimpleContent /> },
  { id: 'MODAL_FIXED', component: <FixedContent /> },
  { id: 'MODAL_SNAPPING', component: <SnappingList /> },
  { id: 'MODAL_ABSOLUTE', component: <AbsoluteHeader /> },
  { id: 'MODAL_CUSTOM', component: <CustomStyle /> },
  { id: 'MODAL_FLAT', component: <FlatList /> },
  { id: 'MODAL_SECTION', component: <SectionList /> },
];

export default class Modalize extends React.PureComponent<IProps> {

  static contextType = ModalContext;
  private modal: React.RefObject<any> = React.createRef();

  componentWillReceiveProps(props: IProps) {
    if (props.context.isOpen && this.modal.current) {
      setTimeout(() => {
        this.modal.current.openModal();
      }, 100);
    }
  }

  private onClosed = () => {
    this.props.context.toggleModal();
  }

  render() {
    const { type } = this.props.context;
    const res = modals.find(modal => modal.id === type)!;

    if (!res) {
      return <View />;
    }

    return React.Children.map(res.component, (c: any) => {
      return React.cloneElement(c, {
        ref: this.modal,
        onClosed: this.onClosed,
      });
    });
  }
}
