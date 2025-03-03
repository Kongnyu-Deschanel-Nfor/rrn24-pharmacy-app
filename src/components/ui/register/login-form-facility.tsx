import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles

const images = [
  "./loginslider/6.png",
  "./loginslider/1.jpg",
  "./loginslider/2.webp",
  "./loginslider/3.jpeg",
  "./loginslider/4.png",
  "./loginslider/5.jpg",
];

export function LoginFormFacility({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [index, setIndex] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // State for phone number

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImageFile(null); // Clear the file if URL is entered
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-6xl mx-auto", className)}>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-blue-600">Register Your Medical Facility</h1>
                <p className="text-balance text-muted-foreground">
                  Join Medifinder to provide emergency care and medical services.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Facility Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Salvation Pharmacy"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sal@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                <PhoneInput
                  international
                  defaultCountry="CM" // Default country (e.g., Cameroon)
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter WhatsApp number"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="buea"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Pharmacy"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A well-equipped medical facility providing emergency care."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <PhoneInput
                  international
                  defaultCountry="CM" // Default country (e.g., Cameroon)
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter emergency contact number"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="google_map_url">Google Map URL</Label>
                <Input
                  id="google_map_url"
                  type="url"
                  placeholder="https://maps.app.goo.gl/hZKPMLs1ZchyD9nu5"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operating_hours">Operating Hours</Label>
                <Input
                  id="operating_hours"
                  type="text"
                  placeholder="24/7"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Facility Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-muted-foreground">Or</p>
                  <Input
                    id="image_url"
                    type="url"
                    placeholder="Paste image URL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                  />
                </div>
              </div>
              <p>Already Have an Account?? <a href='/login' className="text-blue-600 underline hover:text-blue-700">login</a> </p>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Register Facility
              </Button>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt="Sliding Image"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-600">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}