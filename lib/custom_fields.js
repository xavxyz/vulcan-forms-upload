import Telescope from 'meteor/nova:lib';
import PublicationUtils from 'meteor/utilities:smart-publications';
import Upload from './components/Upload.jsx';

if (typeof Package['nova:users'] === 'object') {
  import Users from 'meteor/nova:users';

  // check if user can create a new account
  const canInsert = user => Users.canDo(user, "users.new");
  // check if user can edit a user
  const canEdit = Users.canEdit;

  // **** Custom fields
  Users.addField({
    fieldName: 'telescope.avatar',
    fieldSchema: {
      type: String,
      optional: true,
      publish: true,
      control: Upload,
      insertableIf: canInsert,
      editableIf: canEdit,
      group: {
        name: "avatar",
        label: "Avatar",
        order: 3
      },
      autoform: {
        options: {
          preset: Telescope.settings.get('cloudinaryPresets').avatar
        }
      }
    }
  });

  PublicationUtils.addToFields(Users.publishedFields.list, ['telescope.avatar']);

  // **** Avatar utils extenstion
  const originalAvatarConstructor = Users.avatar;
  
  // extends the Users.avatar function (no fat arrow, `this` needs to refer to Users.avatar constructor)
  Users.avatar = {
    ...originalAvatarConstructor,
    getUrl(user) {
      url = originalAvatarConstructor.getUrl(user);

      return !!user && user.telescope && user.telescope.avatarUploaded ? user.telescope.avatarUploaded : url;
    }
  } 
} 