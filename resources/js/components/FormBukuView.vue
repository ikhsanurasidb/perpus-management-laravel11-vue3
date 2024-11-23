<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useUserStore } from "../stores/counter";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const isbn_readonly = ref(false);
const theroute = useRoute();
const therouter = useRouter();
const store = useUserStore();
const showAlertDialog = ref(false);
const alertMessage = ref("");

const customConfig = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + store.token,
};

const formSchema = toTypedSchema(
    z.object({
        isbn: z
            .union([z.string(), z.number()])
            .transform((val) =>
                typeof val === "string" ? parseInt(val, 10) : val
            )
            .refine((val) => !isNaN(val), {
                message: "ISBN must be a valid number",
            })
            .refine((val) => val > 0, {
                message: "ISBN is required and must be greater than 0",
            }),
        judul: z.string().min(1, "Title is required"),
        pengarang: z.string().min(1, "Author is required"),
        tahun: z
            .number()
            .min(1000, "Year must be at least 1000")
            .max(
                new Date().getFullYear(),
                `Year must not exceed ${new Date().getFullYear()}`
            ),
    })
);

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        isbn: "",
        judul: "",
        pengarang: "",
        tahun: 2020,
    },
});

const save = async (values) => {
    const store_or_update =
        theroute.params.theisbn !== undefined ? "update" : "store";

    console.log(values); // only for development
    console.log(theroute.params.theisbn); // only for development
    console.log(store_or_update); // only for development
    try {
        const url =
            store_or_update === "update"
                ? `http://localhost:8000/api/book/update/${theroute.params.theisbn}`
                : `http://localhost:8000/api/book/store`;

        const response = await axios({
            url: url,
            method: "post",
            data: values,
            headers: customConfig,
        });

        if (response.data.success === true) {
            alertMessage.value =
                store_or_update === "update"
                    ? "Data has been updated!"
                    : "Data has been saved!";
            showAlertDialog.value = true;
        }
    } catch (error) {
        console.log("AJAX" + error);
        alertMessage.value = "An error occurred while saving the data.";
        showAlertDialog.value = true;
    }
};

onMounted(async () => {
    if (theroute.params.theisbn !== undefined) {
        isbn_readonly.value = true;
        try {
            const response = await axios({
                url: `http://localhost:8000/api/book/show/${theroute.params.theisbn}`,
                method: "get",
                headers: customConfig,
            });
            if (response.data.success === true) {
                form.setValues({
                    isbn: response.data.data.isbn,
                    judul: response.data.data.judul,
                    pengarang: response.data.data.pengarang,
                    tahun: response.data.data.tahun,
                });
            }
            console.log(form); // only for development
        } catch (error) {
            console.log("AJAX" + error);
        }
    }
});
</script>

<template>
    <Form @submit="save" :validation-schema="formSchema" v-slot="{ errors }">
        <FormField name="isbn" v-model="form.values.isbn" v-slot="{ field }">
            <FormItem class="mb-8">
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                    <Input
                        v-if="theroute.params.theisbn === undefined || -1"
                        v-bind="field"
                        v-model="form.values.isbn"
                    />
                    <Input
                        v-else
                        v-bind="field"
                        v-model="form.values.isbn"
                        :readonly="isbn_readonly"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField name="judul" v-model="form.values.judul" v-slot="{ field }">
            <FormItem class="mb-8">
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input v-bind="field" v-model="form.values.judul" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            name="pengarang"
            v-model="form.values.pengarang"
            v-slot="{ field }"
        >
            <FormItem class="mb-8">
                <FormLabel>Author</FormLabel>
                <FormControl>
                    <Input v-bind="field" v-model="form.values.pengarang" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField name="tahun" v-model="form.values.tahun" v-slot="{ field }">
            <FormItem class="mb-8">
                <FormLabel>Year</FormLabel>
                <FormControl>
                    <Input
                        v-bind="field"
                        type="number"
                        v-model="form.values.tahun"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <div class="flex justify-between">
            <Button type="submit">Save</Button>
            <Button
                type="button"
                class="text-white bg-red-700"
                @click="therouter.push('/buku')"
                >Cancel</Button
            >
        </div>
    </Form>

    <AlertDialog
        :open="showAlertDialog"
        @update:open="showAlertDialog = $event"
    >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Information</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ alertMessage }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction
                    @click="
                        showAlertDialog = false;
                        therouter.push('/buku');
                    "
                    >OK</AlertDialogAction
                >
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
