export const AvatarTypes = (theme) => {
  return ({
    _base: {
      container: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      image: {
        width: 40,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#808080',
      },
      badge: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -2,
        right: -2,
      },
      badgeText: {
        backgroundColor: 'transparent',
        fontSize: 9,
      }
    },
    big: {
      image: {
        width: 90,
        height: 90,
        borderRadius: 55,
      },
      container: {
        flexDirection: 'column'
      }
    },
    small: {
      image: {
        width: 32,
        height: 32,
        borderRadius:16
      }
    },
    circle: {
      image: {
        borderRadius: 20
      },
    }
  })
};
