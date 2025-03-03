import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Define the User interface
interface User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_type: string;
  whatsapp_number: string;
  image: File | string | null;
}

// Image slider images
const images = [
  './loginslider/6.png',
  './loginslider/1.jpg',
  './loginslider/2.webp',
  './loginslider/3.jpeg',
  './loginslider/4.png',
  './loginslider/5.jpg',
];

export function LoginFormFinder({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const [index, setIndex] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: 'finder',
    whatsapp_number: '',
    image: null,
  });

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  // Handle image URL change
  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    setImageFile(null); // Clear the file if URL is entered
    setFormData((prevData) => ({
      ...prevData,
      image: url,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://rrn24.techchantier.site/Medi-finder/public/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate('/home'); // Redirect to a success page or dashboard
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response?.data);
        setErrors(error.response?.data.errors || {});
      }
    }
  };

  return (
    <div className={cn('flex flex-col gap-6 w-full max-w-10xl mx-auto', className)}>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Registration Form */}
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-blue-600">Join Medifinder as a Finder</h1>
                <p className="text-balance text-muted-foreground">
                  Register to find medical facilities and emergency care near you.
                </p>
              </div>

              {/* Display errors */}
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500">
                  {Object.entries(errors).map(([key, messages]) => (
                    <div key={key}>
                      {messages.map((message) => (
                        <p key={message}>{message}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Full Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div className="grid gap-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                <Input
                  id="whatsapp_number"
                  name="whatsapp_number"
                  type="text"
                  placeholder="678885566"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  We'll use this to notify you about medical facilities.
                </p>
              </div>

              {/* Profile Picture */}
              <div className="grid gap-2">
                <Label htmlFor="image">Profile Picture</Label>
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
                <p className="text-sm text-muted-foreground">
                  Add a profile picture to help others recognize you.
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Register as Finder
              </Button>

              {/* Social Login Options */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ml-2">Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm">
                Already have an account?{' '}
                <a href="#" className="underline underline-offset-4 text-blue-600">
                  Login
                </a>
              </div>
            </div>
          </form>

          {/* Image Slider */}
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
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-600">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}