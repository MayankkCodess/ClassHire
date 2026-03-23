//dialog ek shadcn ka component hai - basically A window overlaid on either the primary window or another dialog window,
// yani ki ek primary form ke upar ek overlaid button or something , jaise ki classHire mai pencil{edit} type button ko click krne prr ek update profile form open ho jata hai..
import { DialogFooter, DialogHeader } from "../../../components/ui/dialog.jsx";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog.jsx";
import { Label } from "../../../components/ui/label.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { useState } from "react";
import { Button } from "../../../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import axios from "axios";
//dhyan rahe haam ynha pr reducer fns ko import karte hain
import { setUser } from "../../../redux/authSlice.js";
import { toast } from "sonner";

//VVV.IMP - 1.  Props = data pass karne ke liye 2. Functions in props = parent ka state control karne ke liye like - onInteractOutside={() => setOpen(false)}
//Props = data jo parent component child component ko deta hai , Props ek object hota hai , Iska kaam: components ko reusable banana
//React ek bahut achi cheez khta hai ki cheezo ko technology ke basis pr nahi usage ke basis pr segregate karo jaisi ki card ko reusable banana hai to ek hi component mai sab dalo html,css,js , bss data changable hona chahiye
//Props ka access sabhi ke pass hota hai - function (props) =>{ console.log(props); }
//props mai ham like - value pass krdete hain aur wnhi hamare wnha hso
const UpdateProfileDialog = ({ open, setOpen }) => {
  //PROPS:- 1. above hame props.username like somethings na krna pade component ke fn mai ye krne ki wajah se :- function (props) =>{ console.log(props); }
  //2. isiliye ham direct destructure krlete hain {username} ,etc
  //3. React default value lagani sikhe ki agar like {btnText || "visit me"}// to ye ho jaye , 10 logo ki team mai galti ho sakti hain
  //4. Upar wale se bhi acha hai ki prop destructure kr waqt he default declare krdo - , {btnText="visit me"};
  //5. baki mujhe ye samaj aa chuka hai ki mai ek component se dusre component mai value pass kr sakta hun aur agar mujhe us value ko recieve krna hai , toh component ke andar mai jab bhi function declare kr rha hu toh mere pass props ka access hota hai , mai vnha unhe destructure krke , simple variable ki tarah use krsakta hun
  //6. jaisi ki ynha :- Parent ne 2 cheeze pass ki // { open: false, setOpen: function , }

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    // file:user?.profile?.resume
    // file: null, // 👈 only for new uploads
    file: user?.profile?.resume, // 👈 keep URL separately
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // FormData is a built-in JavaScript Web API object (browser gives it to you). You don’t import it. You don’t install it. It comes automatically from the browser environment.
    const formData = new FormData();
    // Now you created an empty container above
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      //Update profile controller ko route ke through run kraya jayega
      //check update profile controller , route , redux , after this -
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    // taki jo edit form open hua hai woh band ho jaye
    setOpen(false);
    console.log(input);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  onChange={fileHandler}
                  className="col-span-3"
                  type="file"
                  accept="application/pdf"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
