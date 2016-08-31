import Telescope from 'meteor/nova:lib';
import PublicationUtils from 'meteor/utilities:smart-publications';
import Upload from './components/Upload.jsx';
import checkSettings from './utils.js';
import Users from 'meteor/nova:users';

if ( checkSettings() ) { //no need for cheking if it exist and then importing because you can only import on the top of the file
  

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
      autoform: {
        options: {
          preset: Telescope.settings.get('cloudinaryPresets').avatar
        },
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

      return !!user && user.telescope && user.telescope.avatar ? user.telescope.avatar : url;
    }
  } 
} 
