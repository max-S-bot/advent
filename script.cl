;; sbcl --script script.cl

(require :uiop)

(print "Hello, World!")
(terpri)

;; day1

(defvar strArr (
    uiop:split-string (
        uiop:read-file-string #p"data-2025/day1.txt") :separator ",") )
(defvar arrData (mapcar #'(lambda (x) 
            (* (if (string= (subseq x 0 1) "L") -1 1) 
            (parse-integer (subseq x 1))) ) strArr) )
(let 
    ((d 50)
    (c 0))
    (loop for x in arrData do
        (if (= (setf d (mod (+ d x) 100)) 0) (incf c))
    )
    (print c)
    (terpri)
)
(let
    ((d 50)
    (c 0))
    (loop for x in arrData do
        (incf c (abs (+ (if (or (> (setf d (+ d x)) 0) (= (- d x) 0)) 0 -1) (truncate d 100))))
        (setf d (mod d 100))
    )
    (print c)
    (terpri)
)

;; day1 end

;; day2


;; day2 end 