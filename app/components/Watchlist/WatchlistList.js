import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import SwipeableRow from '../UI/SwipeableRow';
import { images } from '../../assets/images';
import theme from '../../theme';

export const WatchlistList = props => {
  const [damping] = useState(1 - 0.6);
  const [tension] = useState(300);

  const watchlists = useSelector(({ watchlists }) => watchlists.data);
  const watchlist = useSelector(({ watchlist }) => watchlist.data);
  const { handleShowModal } = props;

  const dispatch = useDispatch();

  const showConfirmDialogue = (content, callback = null) => {
    //TODO-EP move showConfirmDialogue into an action

    const defaultButtons = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => (callback && callback()) || console.log('ok!'),
      },
    ];
    const title = (content && content.title) || 'Are you sure?';
    const message =
      (content && content.message) ||
      'This will permenantly remove this item.  Click "OK" to continue';
    const buttons = (content && content.buttons) || defaultButtons;
    const options = (content && content.options) || {};

    return Alert.alert(title, message, buttons, options);
  };

  const handleItemPress = value => {
    dispatch(Actions.getWatchlist(value));
    handleShowModal();
  };

  const handleAddWatchlist = () => {
    dispatch(Actions.createWatchlist('test watchlist'));
  };

  const handleDeleteWatchlist = id => {
    if (watchlist.id === id) {
      const content = {
        title: "Whoa! That's not gonna work...",
        message: "You can't delete an active watchlist.",
        buttons: [{ text: 'OK' }],
      };
      return showConfirmDialogue(content);
    }
    return showConfirmDialogue(null, () =>
      dispatch(Actions.deleteWatchlist(id)),
    );
  };

  const _renderRows = () =>
    watchlists.map(item => (
      <SwipeableRow
        key={item.id}
        rowStyle={styles.rowStyle}
        drawerBackgroundColor={styles.rowDrawerBackgroundColor}
        buttonCallback={() => handleDeleteWatchlist(item.id)}
        buttonImage={images.iconTrash}
        damping={damping}
        tension={tension}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <View style={styles.iconLeftContainer}>
              {item.id === watchlist.id && (
                <Icon
                  name="md-checkmark-circle-outline"
                  style={styles.iconLeft}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.rowTitle}>{item.name}</Text>
            <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
          </View>
          <View style={styles.iconRightContainer}>
            <Icon name="md-reorder" style={styles.icon} />
          </View>
        </View>
      </SwipeableRow>
    ));

  return (
    <Container>
      <Header>
        <Body noLeft={true}>
          <Title>My Watchlists</Title>
        </Body>
        <Right>
          <Button onPress={handleShowModal} transparent>
            <Icon name="md-close" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <Item style={styles.buttonContainer}>
          <Button
            onPress={handleAddWatchlist}
            style={styles.button}
            block
            success
            bordered>
            <Text>Create Watchlist</Text>
          </Button>
        </Item>
        {_renderRows()}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  rowDrawerBackgroundColor: {
    backgroundColor: theme.dark.brandDanger,
  },
  rowStyle: {
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: theme.dark.brandPrimary,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  buttonContainer: {
    marginVertical: 15,
  },
  button: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.dark.listBorderColor,
  },
  iconLeftContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: theme.dark.blue2,
    borderWidth: 1,
    margin: 20,
    marginLeft: 0,
    backgroundColor: theme.dark.blue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
  },
  iconLeft: {
    color: theme.dark.brandSuccess,
  },
  iconRightContainer: {
    flex: 0,
    marginLeft: 'auto',
    marginRight: 10,
  },
});
