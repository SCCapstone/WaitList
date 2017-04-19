import '../../imports/api/students.js';

var modalId_checkOut;
var modalId_delete;
var whoToContact;
//subscribes to collection to access data
Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
});

//gets every student in collection, this is used to populate the table in .html file
Template.adminPage.student = function() {
    return Students.find({}, {sort: {createdAt: 1}});
};

//gives functionality to buttons on admin page
Template.buttonSelections.events({
    //Updates status on click of check-in button to In advisment
  'click .check-in, click .glyphicon-log-in' (event) {
      var status = Students.findOne(this._id).currentStatus;
      if(status == "Waiting"){
          var timestamp = Students.findOne(this._id).createdAt;
          console.log(timestamp);
          Students.update(this._id, {$set: {currentStatus: "In Advisement"}});
          Meteor.call("updateWaitTime", timestamp);
          whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
          var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
          if(receiveText == true){
              Meteor.call("getToUAC", whoToContact);
          }
      }
       //$(event.target).closest('.mainRow').css({"background-color":"#16B804","color":"white"});
   },
   //on click of move button it moves person to bottom of the list and updates all wait times in the list
   'click .move'(){
       var lastWait = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{waitTime:1, _id:0}}).waitTime;
       //console.log(lastWait);
       var timestamp1 = Students.findOne(this._id).createdAt;
       Students.update(this._id, {$set: {createdAt: new Date(), waitTime: lastWait}});
       var timestamp2 = Students.findOne(this._id).createdAt;
       
       //calls on server side code to update multiple people in the collection at one time
       Meteor.call("updateAfterMove", timestamp1, timestamp2);
       whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
       console.log(whoToContact);
       var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
       console.log(receiveText);
       if(receiveText == true){
           Meteor.call("getToUAC", whoToContact);
       }
   },
   //updates wait times when student removed
   'click .checkingOut'(){
       console.log(this._id);
       modalId_checkOut = this._id;
       console.log(modalId_checkOut);
       Modal.show('checkOutModal', function () {
           return Students.findOne(this._id);
	    });
   },
   'click .delete'(){
       console.log(this._id);
       modalId_delete = this._id;
       console.log(modalId_delete);
       Modal.show('deleteModal', function() {
           return Students.findOne(this._id);
       });
   }
});








public function appendWaitlistJoinLeaveButtons ($content) {
    global $post;
    if (!$post) { return $content; } // Don't run if we're not being called by WordPress.
    $lists = get_post_meta($post->ID, $this->prefix . 'lists', true);
    if (empty($lists)) { return $content; } // Don't run if there is no waitlist info for this post.
    $html = '';
    if (!post_password_required($post->ID)) {
        $current_user_id = get_current_user_id();
        if (0 === $current_user_id) { // No user is logged in.
            $html .= '<p>';
            $html .= sprintf(
                esc_html__('%1$s with your account in order to be able to join "%2$s" lists!', 'wp-waitlist'),
                wp_loginout(get_permalink($post->ID), false),
                $post->post_title
            );
            $html .= '</p>';
        } else {
            $permalink = get_permalink($post->ID);
            $html .= '<ul class="' . $this->prefix . '-join-leave-button-list">';
            foreach ($lists as $list) {
                $html .= '<li><form action="' . $permalink . '">';
                // If a blog isn't using pretty permalinks, this form (being an HTTP GET)
                // overrides the query string in the `action` attribute, so add the permalink manually.
                $x = get_option('permalink_structure');
                if (empty($x)) {
                    $qsx = explode('=', parse_url($permalink, PHP_URL_QUERY));
                    $html .= '<input type="hidden" name="' . $qsx[0] . '" value="' . $qsx[1] . '">';
                }
                $html .= wp_nonce_field('join_or_leave_list', $this->prefix . 'nonce', false, false);
                $html .= '<input type="hidden" name="' . $this->prefix . 'the_post" value="' . esc_attr($post->ID) . '" />';
                $html .= '<input type="hidden" name="' . $this->prefix . 'list_name" value="' . esc_attr($list['name']) . '" />';
                // Is this user already on this list?
                $user_ids = $this->getUsersOnList($post->ID, $list['name']);
                if (in_array($current_user_id, $user_ids)) {
                    // User is currently listed, so make a "Leave List" button.
                    $html .= '<input type="hidden" name="' . $this->prefix . 'action" value="leave" />';
                    $html .= '<input type="submit" value="' . sprintf(esc_attr__('Leave "%s" List', 'wp-waitlist'), $list['name']) . '" />';
                } else {
                    // User is not on this list, so make a "Join List" button,
                    $html .= '<input type="hidden" name="' . $this->prefix . 'action" value="join" />';
                    // but make it say join WAIT list if the list is at capacity already
                    $btn_text = '';
                    if (!empty($list['max']) && count($user_ids) >= $list['max']) {
                        $btn_text = esc_attr__('Join waitlist for "%s" list', 'wp-waitlist');
                    } else {
                        $btn_text = esc_attr('Join "%s" list', 'wp-waitlist');
                    }
                    $html .= '<input type="submit" value="' . sprintf($btn_text, $list['name']) . '" />';
                }
                $html .= '</form></li>';
            }
            $html .= '</ul>';
        }
    }
    return $content . $html;
}











Template.deleteModal.events({
    'click .deleteStudent'(){
        console.log(modalId_delete);
        var timestamp = Students.findOne(modalId_delete).createdAt;
        var status = Students.findOne(modalId_delete).currentStatus;
        var phone = Students.findOne(modalId_delete).PhoneNumber;
        var waitTime = Students.findOne(modalId_delete).waitTime;
        var canGetText = Students.findOne(modalId_delete).Disclaimer;
        console.log(status);
        console.log(waitTime);
        if(status == "Waiting"){
            Meteor.call("updateWaitTime", timestamp);
            if(Students.find().count() > 3){
                whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
                var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                if(receiveText == true){
                    Meteor.call("getToUAC", whoToContact);
                }
            }
            if(canGetText == true){
                if(waitTime == 0){
                    Meteor.call("removedMessage", phone);
                }else{
                    Meteor.call("accidentalRemoval", phone)
                }            
            }
        }
        Students.remove(modalId_delete);
    }
});

//allows rows on admin page in table to expand and collapse on press of +/- button, shows hidden row
Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
});
