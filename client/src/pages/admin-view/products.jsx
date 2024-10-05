import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import { uploadImageToCloudinary } from "@/lib/utils";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [result, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setImageLoadingState(true); // Start loading state for the image

    // Upload the image to Cloudinary
    let result = '';
    if(imageFile){
     result = await uploadImageToCloudinary(imageFile);
    }

    // Update the form data with the uploaded image URL
    const updatedFormData = { ...formData, image: result };

    if (currentEditedId !== null) {
      // Edit existing product
      const editResponse = await dispatch(
        editProduct({
          id: currentEditedId,
          formData: updatedFormData,
        })
      );

      // Check if the edit was successful
      if (editResponse?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh product list
        resetForm(); // Reset form and state
        toast({ title: "Product edited successfully" }); // Show success toast
      }
    } else {
      // Add new product
      const addResponse = await dispatch(addNewProduct(updatedFormData));

      // Check if the product was added successfully
      if (addResponse?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh product list
        resetForm(); // Reset form and state
        toast({ title: "Product added successfully" }); // Show success toast
      }
    }

    setImageLoadingState(false); // Stop loading state after the operation completes
  }

  function resetForm() {
    // Reset form and state after successful operation
    setFormData(initialFormData);
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setImageFile(null);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    // return Object.keys(formData)
    //   .filter((currentKey) => currentKey !== "averageReview")
    //   .map((key) => formData[key] !== "")
    //   .every((item) => item);
    return true;
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            // isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
