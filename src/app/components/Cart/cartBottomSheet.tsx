"use client"

import Image from "next/image";
import { X, ShoppingCart, Minus, Plus, Trash2, Pencil } from "lucide-react";
import { CartItem, SWEETNESS_LABELS, SWEETNESS_OPTIONS, SweetnessLevel } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import deletemo